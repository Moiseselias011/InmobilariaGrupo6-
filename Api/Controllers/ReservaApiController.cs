using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using System.Security.Claims;

namespace InmobilariaGrupo6_.Controllers;

public class ControllerReserva : ControllerApiBase<Reserva>
{
    public ControllerReserva(InmobiliariaContext context)
        : base(context)
    {
    }

    [HttpGet("ConDetalles/{id}")]
    public Reserva? GetByIdConDetalles(int id)
    {
        return _context.Set<Reserva>()
            .Include(r => r.Inquilino)
            .Include(r => r.Inmueble)
            .Include(r => r.UsuarioCreacion)
            .Include(r => r.UsuarioTerminacion)
            .FirstOrDefault(r => r.IdReserva == id);
    }

    [HttpPost]
    public override void Create(Reserva reserva)
    {
        var idUsuario = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        reserva.IdUsuarioCreacion = idUsuario;

        _context.Set<Reserva>().Add(reserva);
        _context.SaveChanges();
    }

    [HttpPost("Extender/{id}")]
    public IActionResult ExtenderReserva(
        int id,
        [FromBody] ExtenderReservaRequest request)
    {
     
        var reservaOriginal = _context.Set<Reserva>()
            .FirstOrDefault(r => r.IdReserva == id);

        if (reservaOriginal == null)
        {
            return NotFound("La reserva no existe.");
        }

        if (request.FechaInicio >= request.FechaFin)
        {
            return BadRequest(
                "La fecha de inicio debe ser anterior a la fecha de fin."
            );
        }

        
        if (request.FechaInicio < reservaOriginal.FechaFin)
        {
            return BadRequest(
                "La extensión debe comenzar desde la fecha de finalización de la reserva original."
            );
        }

     
        var existeSolapamiento = _context.Set<Reserva>()
            .Any(r =>
                r.IdReserva != reservaOriginal.IdReserva &&
                r.IdInmueble == reservaOriginal.IdInmueble &&
                request.FechaInicio < r.FechaFin &&
                request.FechaFin > r.FechaInicio
            );

        if (existeSolapamiento)
        {
            return BadRequest(
                "El inmueble ya está reservado durante las fechas seleccionadas."
            );
        }

        
        var idUsuario = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        var nuevaReserva = new Reserva
        {
            IdInquilino = reservaOriginal.IdInquilino,
            IdInmueble = reservaOriginal.IdInmueble,
            FechaInicio = request.FechaInicio,
            FechaFin = request.FechaFin,
            MontoPorDia = reservaOriginal.MontoPorDia,
            IdUsuarioCreacion = idUsuario
        };

        _context.Set<Reserva>().Add(nuevaReserva);
        _context.SaveChanges();

        return Ok(nuevaReserva);
    }


    

    [HttpPost("Terminar/{id}")]
    public IActionResult TerminarReserva(
        int id,
        [FromBody] TerminarReservaRequest request)
    {
    
        var reserva = _context.Set<Reserva>()
            .FirstOrDefault(r => r.IdReserva == id);

        if (reserva == null)
        {
            return NotFound("La reserva no existe.");
        }

      
        if (reserva.FechaTerminacion.HasValue)
        {
            return BadRequest(
                "La reserva ya fue terminada anticipadamente."
            );
        }

       
       
        if (request.FechaTerminacion <= reserva.FechaInicio)
        {
            return BadRequest(
                "La fecha de terminación debe ser posterior a la fecha de inicio."
            );
        }

        if (request.FechaTerminacion >= reserva.FechaFin)
        {
            return BadRequest(
                "La fecha de terminación debe ser anterior a la fecha de fin original."
            );
        }

        var diasOriginales =
            (reserva.FechaFin - reserva.FechaInicio).Days;

    
        var diasTranscurridos =
            (request.FechaTerminacion - reserva.FechaInicio).Days;

       
        var diasRestantes =
            (reserva.FechaFin - request.FechaTerminacion).Days;

        if (diasOriginales <= 0)
        {
            return BadRequest(
                "La reserva tiene un período inválido."
            );
        }

        if (diasRestantes <= 0)
        {
            return BadRequest(
                "No quedan días pendientes para calcular la multa."
            );
        }

        // Determinar porcentaje de multa
        decimal porcentajeMulta;

        if (diasTranscurridos < diasOriginales / 2.0)
        {
            porcentajeMulta = 0.50m;
        }
        else
        {
            porcentajeMulta = 0.25m;
        }

     
        var montoRestante =
            diasRestantes * reserva.MontoPorDia;

        var montoMulta =
            montoRestante * porcentajeMulta;

        var claimUsuario =
            User.FindFirst(ClaimTypes.NameIdentifier);

        if (claimUsuario == null)
        {
            return Unauthorized();
        }

        var idUsuario = int.Parse(claimUsuario.Value);


        if (string.IsNullOrWhiteSpace(request.MetodoPago))
        {
            return BadRequest(
                "Debe seleccionar un método de pago para registrar la multa."
            );
        }

       
      
      

        using var transaction =
            _context.Database.BeginTransaction();

        try
        {
           
            reserva.FechaTerminacion =
                request.FechaTerminacion;

            reserva.IdUsuarioTerminacion =
                idUsuario;
           
            var pagoMulta = new Pago
            {
                IdReserva = reserva.IdReserva,

                FechaPago =
                    request.FechaTerminacion,

                Monto =
                    Math.Round(
                        montoMulta,
                        2
                    ),

                MetodoPago =
                    request.MetodoPago,

                IdUsuarioCreacion =
                    idUsuario,

                Anulado = false
            };

            _context.Set<Pago>().Add(pagoMulta);

           
            _context.SaveChanges();

            
            transaction.Commit();

            return Ok(new
            {
                mensaje =
                    "La reserva fue terminada anticipadamente y la multa fue registrada correctamente.",

                idReserva =
                    reserva.IdReserva,

                fechaTerminacion =
                    reserva.FechaTerminacion,

                fechaFinOriginal =
                    reserva.FechaFin,

                diasOriginales,

                diasTranscurridos,

                diasRestantes,

                porcentajeMulta,

                montoRestante,

                montoMulta =
                    Math.Round(
                        montoMulta,
                        2
                    ),

                idPago =
                    pagoMulta.IdPago
            });
        }
        catch
        {
            transaction.Rollback();

            return StatusCode(
                500,
                "No se pudo terminar la reserva ni registrar la multa."
            );
        }
    }
}






public class ExtenderReservaRequest
{
    public DateTime FechaInicio { get; set; }

    public DateTime FechaFin { get; set; }
}




public class TerminarReservaRequest
{
    public DateTime FechaTerminacion { get; set; }

    public string MetodoPago { get; set; } = string.Empty;
}