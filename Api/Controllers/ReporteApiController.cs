using Microsoft.AspNetCore.Mvc;
using InmobilariaGrupo6_.Data;

namespace InmobilariaGrupo6_.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReporteApiController : ControllerBase
{
    private readonly InmobiliariaContext _context;

    public ReporteApiController(InmobiliariaContext context)
    {
        _context = context;
    }

    [HttpGet("Inmuebles")]
    public IActionResult Inmuebles(bool? disponible)
    {
        var consulta = _context.Inmueble
            .AsQueryable();

        if (disponible.HasValue)
        {
            consulta = consulta.Where(i =>
                i.Disponible == disponible.Value);
        }

        var resultado = consulta
            .Select(i => new
            {
                i.IdInmueble,
                i.Direccion,
                i.Cupo,
                i.PrecioPorDia,
                i.Disponible,
                i.IdPropietario,

                Propietario = _context.Propietario
                    .Where(p =>
                        p.idPropietario == i.IdPropietario)
                    .Select(p =>
                        p.nombre + " " + p.apellido)
                    .FirstOrDefault(),

                Tipo = _context.TipoInmueble
                    .Where(t =>
                        t.IdTipoInmueble == i.IdTipoInmueble)
                    .Select(t => t.Nombre)
                    .FirstOrDefault()
            })
            .ToList();

        return Ok(resultado);
    }

    [HttpGet("InmueblesPorPropietario/{idPropietario}")]
    public IActionResult InmueblesPorPropietario(
        int idPropietario)
    {
        var resultado = _context.Inmueble
            .Where(i =>
                i.IdPropietario == idPropietario)
            .Select(i => new
            {
                i.IdInmueble,
                i.Direccion,
                i.Cupo,
                i.PrecioPorDia,
                i.Disponible,
                i.IdPropietario,

                Propietario = _context.Propietario
                    .Where(p =>
                        p.idPropietario == i.IdPropietario)
                    .Select(p =>
                        p.nombre + " " + p.apellido)
                    .FirstOrDefault(),

                Tipo = _context.TipoInmueble
                    .Where(t =>
                        t.IdTipoInmueble == i.IdTipoInmueble)
                    .Select(t => t.Nombre)
                    .FirstOrDefault()
            })
            .ToList();

        return Ok(resultado);
    }

    [HttpGet("ReservasPorPeriodo")]
    public IActionResult ReservasPorPeriodo(
        DateTime fechaInicio,
        DateTime fechaFin)
    {
        if (fechaInicio >= fechaFin)
        {
            return BadRequest(
                "La fecha de inicio debe ser anterior a la fecha de fin."
            );
        }

        var resultado = _context.Reservas
            .Where(r =>
                r.FechaInicio < fechaFin &&
                r.FechaFin > fechaInicio)
            .Select(r => new
            {
                r.IdReserva,
                r.IdInquilino,
                r.IdInmueble,
                r.FechaInicio,
                r.FechaFin,
                r.MontoPorDia,

                Inquilino = _context.Inquilinos
                    .Where(i =>
                        i.IdInquilino == r.IdInquilino)
                    .Select(i =>
                        i.NombreCompleto)
                    .FirstOrDefault(),

                Inmueble = _context.Inmueble
                    .Where(i =>
                        i.IdInmueble == r.IdInmueble)
                    .Select(i =>
                        i.Direccion)
                    .FirstOrDefault()
            })
            .ToList();

        return Ok(resultado);
    }

    [HttpGet("PagosReserva/{idReserva}")]
    public IActionResult PagosReserva(int idReserva)
    {
        var reservaExiste = _context.Reservas
            .Any(r =>
                r.IdReserva == idReserva);

        if (!reservaExiste)
        {
            return NotFound(
                "La reserva no existe."
            );
        }

        var resultado = _context.Pago
            .Where(p =>
                p.IdReserva == idReserva)
            .Select(p => new
            {
                p.IdPago,
                p.IdReserva,
                p.FechaPago,
                p.Monto,
                p.MetodoPago,
                p.Anulado
            })
            .ToList();

        return Ok(resultado);
    }

    [HttpGet("InmueblesDisponibles")]
    public IActionResult InmueblesDisponibles(
        DateTime fechaInicio,
        DateTime fechaFin)
    {
        if (fechaInicio >= fechaFin)
        {
            return BadRequest(
                "La fecha de inicio debe ser anterior a la fecha de fin."
            );
        }

        var resultado = _context.Inmueble
            .Where(i =>
                i.Disponible &&
                !_context.Reservas.Any(r =>
                    r.IdInmueble == i.IdInmueble &&
                    r.FechaInicio < fechaFin &&
                    (r.FechaTerminacion ?? r.FechaFin) > fechaInicio
                ))
            .Select(i => new
            {
                i.IdInmueble,
                i.Direccion,
                i.Cupo,
                i.PrecioPorDia,
                i.Disponible,
                i.IdPropietario,

                Propietario = _context.Propietario
                    .Where(p =>
                        p.idPropietario == i.IdPropietario)
                    .Select(p =>
                        p.nombre + " " + p.apellido)
                    .FirstOrDefault(),

                Tipo = _context.TipoInmueble
                    .Where(t =>
                        t.IdTipoInmueble == i.IdTipoInmueble)
                    .Select(t => t.Nombre)
                    .FirstOrDefault()
            })
            .ToList();

        return Ok(resultado);
    }
}