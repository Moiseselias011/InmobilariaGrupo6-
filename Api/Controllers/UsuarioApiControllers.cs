using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.AspNetCore.Authorization;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Administrador")]
public class ControllerUsuario : ControllerApiBase<Usuario>
{
    public ControllerUsuario(InmobiliariaContext context)
        : base(context)
    {
    }
}