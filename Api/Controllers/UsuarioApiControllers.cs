using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Administrador")]
public class ControllerUsuario : ControllerApiBase<Usuario>
{
    public ControllerUsuario(InmobiliariaContext context)
        : base(context)
    {
    }

    [HttpGet("paginado-usuarios")]
    public async Task<IActionResult> GetPaginadoUsuarios(
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

        var consulta = _context.Usuarios
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(buscar))
        {
            buscar = buscar.Trim();

            consulta = consulta.Where(u =>
                u.Nombre.Contains(buscar) ||
                u.Apellido.Contains(buscar) ||
                u.Email.Contains(buscar)
            );
        }

        var total =
            await consulta.CountAsync();

        var datos =
            await consulta
                .OrderBy(u => u.IdUsuario)
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
    public override void Create(Usuario usuario)
    {
        usuario.Password =
            BCrypt.Net.BCrypt.HashPassword(
                usuario.Password
            );

        base.Create(usuario);
    }

    [HttpPut]
    public override void Update(Usuario usuario)
    {
        var usuarioExistente =
            _context.Usuarios
                .FirstOrDefault(
                    u =>
                        u.IdUsuario ==
                        usuario.IdUsuario
                );

        if (usuarioExistente == null)
        {
            return;
        }

        if (
            string.IsNullOrWhiteSpace(
                usuario.Password
            )
        )
        {
            usuario.Password =
                usuarioExistente.Password;
        }
        else
        {
            usuario.Password =
                BCrypt.Net.BCrypt.HashPassword(
                    usuario.Password
                );
        }

        base.Update(usuario);
    }
}