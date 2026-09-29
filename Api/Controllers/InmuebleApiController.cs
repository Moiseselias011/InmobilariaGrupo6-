using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Empleado,Administrador")]
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

        consulta = consulta.Where(i => i.Disponible);

        if (!string.IsNullOrWhiteSpace(filtros.Direccion))
        {
            consulta = consulta.Where(i =>
                i.Direccion.Contains(filtros.Direccion));
        }

        if (filtros.IdTipoInmueble.HasValue)
        {
            consulta = consulta.Where(i =>
                i.IdTipoInmueble == filtros.IdTipoInmueble.Value);
        }

        if (filtros.Cupo.HasValue)
        {
            consulta = consulta.Where(i =>
                i.Cupo >= filtros.Cupo.Value);
        }

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