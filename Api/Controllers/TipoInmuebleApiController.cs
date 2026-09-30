using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Empleado,Administrador")]
public class ControllerTipoInmueble : ControllerApiBase<TipoInmueble>
{
    public ControllerTipoInmueble(InmobiliariaContext context)
        : base(context)
    {
    }

    [HttpGet("paginado-tipos")]
    public async Task<IActionResult> GetPaginadoTipos(
        int pagina = 1,
        int cantidad = 10,
        string? buscar = null)
    {
        if (pagina < 1)
        {
            pagina = 1;
        }

        if (cantidad < 1)
        {
            cantidad = 10;
        }

        if (cantidad > 100)
        {
            cantidad = 100;
        }

        var consulta = _context.Set<TipoInmueble>()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(buscar))
        {
            buscar = buscar.Trim();

            consulta = consulta.Where(t =>
                t.Nombre.Contains(buscar)
            );
        }

        var total =
            await consulta.CountAsync();

        var datos =
            await consulta
                .OrderBy(t => t.IdTipoInmueble)
                .Skip(
                    (pagina - 1) *
                    cantidad
                )
                .Take(cantidad)
                .ToListAsync();

        return Ok(new
        {
            datos,
            pagina,
            cantidad,
            total,
            totalPaginas =
                (int)Math.Ceiling(
                    (double)total /
                    cantidad
                )
        });
    }
}