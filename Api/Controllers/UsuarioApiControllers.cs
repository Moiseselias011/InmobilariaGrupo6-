using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Administrador")]
public class ControllerUsuario : ControllerApiBase<Usuario>
{
    public ControllerUsuario(InmobiliariaContext context)
        : base(context)
    {
    }

    [HttpPost]
    public override void Create(Usuario usuario)
    {
        usuario.Password = BCrypt.Net.BCrypt.HashPassword(usuario.Password);

        base.Create(usuario);
    }

    [HttpPut]
    public override void Update(Usuario usuario)
    {
        var usuarioExistente = _context.Usuarios
            .FirstOrDefault(u => u.IdUsuario == usuario.IdUsuario);

        if (usuarioExistente == null)
        {
            return;
        }

        // Si el administrador no escribioo una nueva contraseña,
        // mantenemos la contraseña actual.
        if (string.IsNullOrWhiteSpace(usuario.Password))
        {
            usuario.Password = usuarioExistente.Password;
        }
        else
        {
            // Si escribió una nueva contraseña, la encriptamos.
            usuario.Password = BCrypt.Net.BCrypt.HashPassword(usuario.Password);
        }

        base.Update(usuario);
    }
}