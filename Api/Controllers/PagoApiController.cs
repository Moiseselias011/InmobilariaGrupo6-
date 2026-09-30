using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Empleado,Administrador")]
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

    [HttpGet("Reservas")]
    public IActionResult ObtenerReservas(
        string? buscar = null)
    {
        var consulta = _context.Set<Reserva>()
            .Include(r => r.Inquilino)
            .Include(r => r.Inmueble)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(buscar))
        {
            buscar = buscar.Trim();

            consulta = consulta.Where(r =>
                r.Inquilino.NombreCompleto.Contains(buscar) ||
                r.Inmueble.Direccion.Contains(buscar)
            );
        }

        var reservas = consulta
            .OrderByDescending(r => r.IdReserva)
            .ToList();

        return Ok(reservas);
    }

    [HttpGet("paginado-pagos")]
    public async Task<IActionResult> GetPaginadoPagos(
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

        var consulta = _context.Set<Pago>()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(buscar))
        {
            buscar = buscar.Trim();

            consulta = consulta.Where(p =>
                p.MetodoPago.Contains(buscar)
            );
        }

        var total =
            await consulta.CountAsync();

        var datos =
            await consulta
                .OrderByDescending(p => p.IdPago)
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

    [HttpPost]
    public override void Create(Pago pago)
    {
        var reserva = _context.Set<Reserva>()
            .FirstOrDefault(
                r => r.IdReserva == pago.IdReserva
            );

        if (reserva == null)
        {
            throw new Exception(
                "La reserva no existe."
            );
        }

        var cantidadDias =
            (
                reserva.FechaFin -
                reserva.FechaInicio
            ).Days;

        pago.Monto =
            cantidadDias *
            reserva.MontoPorDia;

        var idUsuario = int.Parse(
            User.FindFirst(
                ClaimTypes.NameIdentifier
            )!.Value
        );

        pago.IdUsuarioCreacion =
            idUsuario;

        pago.Anulado = false;

        _context.Set<Pago>()
            .Add(pago);

        _context.SaveChanges();
    }

    [Authorize(Roles = "Administrador")]
    [HttpPut("Anular/{id}")]
    public IActionResult AnularPago(int id)
    {
        var pago = _context.Set<Pago>()
            .FirstOrDefault(
                p => p.IdPago == id
            );

        if (pago == null)
        {
            return NotFound();
        }

        var idUsuario = int.Parse(
            User.FindFirst(
                ClaimTypes.NameIdentifier
            )!.Value
        );

        pago.Anulado = true;

        pago.IdUsuarioAnulacion =
            idUsuario;

        _context.SaveChanges();

        return Ok();
    }
}