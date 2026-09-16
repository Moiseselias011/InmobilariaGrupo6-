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


}
