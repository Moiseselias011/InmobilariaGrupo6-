using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace InmobilariaGrupo6_.Controllers;

public class ControllerPago : ControllerApiBase<Pago>
{
    public ControllerPago(InmobiliariaContext context)
        : base(context)
    {
    }

    [HttpGet("ConDetalles/{id}")]
    public Pago? GetByIdConDetalles(int id)
    {
        return _context.Set<Pago>()
            .Include(p => p.UsuarioCreacion)
            .Include(p => p.UsuarioAnulacion)
            .FirstOrDefault(p => p.IdPago == id);
    }

    // OBTENER RESERVAS PARA CREAR PAGOS
    [HttpGet("Reservas")]
    public IActionResult ObtenerReservas()
    {
        var reservas = _context.Set<Reserva>()
            .Include(r => r.Inquilino)
            .Include(r => r.Inmueble)
            .ToList();

        return Ok(reservas);
    }

    [HttpPost]
    public override void Create(Pago pago)
    {
        // Buscar la reserva
        var reserva = _context.Set<Reserva>()
            .FirstOrDefault(r => r.IdReserva == pago.IdReserva);

        if (reserva == null)
        {
            throw new Exception("La reserva no existe.");
        }

        // Calcular cantidad de días
        var cantidadDias =
            (reserva.FechaFin - reserva.FechaInicio).Days;

        // Calcular monto total
        pago.Monto =
            cantidadDias * reserva.MontoPorDia;

        // Obtener usuario que crea el pago
        var idUsuario = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        pago.IdUsuarioCreacion = idUsuario;
        pago.Anulado = false;

        _context.Set<Pago>().Add(pago);

        _context.SaveChanges();
    }

    [Authorize(Roles = "Administrador")]
    [HttpPut("Anular/{id}")]
    public IActionResult AnularPago(int id)
    {
        var pago = _context.Set<Pago>()
            .FirstOrDefault(p => p.IdPago == id);

        if (pago == null)
        {
            return NotFound();
        }

        var idUsuario = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        pago.Anulado = true;
        pago.IdUsuarioAnulacion = idUsuario;

        _context.SaveChanges();

        return Ok();
    }
}