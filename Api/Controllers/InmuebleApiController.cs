
using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InmobilariaGrupo6_.Controllers;

public class ControllerInmueble : ControllerApiBase<Inmueble>
{
    public ControllerInmueble(InmobiliariaContext context)
        : base(context)
    {
    }

    [HttpGet("buscar")]
    public IActionResult Buscar([FromQuery] BusquedaInmueble filtros)
    {
        var consulta = _context.Inmueble
            .AsQueryable();

        // Solo muestra inmuebles disponibles
        consulta = consulta.Where(i => i.Disponible);

        // Filtra por dirección
        if (!string.IsNullOrWhiteSpace(filtros.Direccion))
        {
            consulta = consulta.Where(i =>
                i.Direccion.Contains(filtros.Direccion));
        }

        // Filtra por tipo
        if (filtros.IdTipoInmueble.HasValue)
        {
            consulta = consulta.Where(i =>
                i.IdTipoInmueble == filtros.IdTipoInmueble.Value);
        }

        // Filtra por cupo mínimo
        if (filtros.Cupo.HasValue)
        {
            consulta = consulta.Where(i =>
                i.Cupo >= filtros.Cupo.Value);
        }

        // Filtra por fechas
        if (filtros.FechaInicio.HasValue &&
            filtros.FechaFin.HasValue)
        {
            var fechaInicio = filtros.FechaInicio.Value;
            var fechaFin = filtros.FechaFin.Value;

            consulta = consulta.Where(i =>
                !_context.Reservas.Any(r =>
                    r.IdInmueble == i.IdInmueble &&
                    r.FechaInicio < fechaFin &&
                    r.FechaFin > fechaInicio
                ));
        }

        return Ok(consulta.ToList());
    }
}

