using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.AspNetCore.Authorization;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Empleado,Administrador")]
public class ControllerPropietario : ControllerApiBase<Propietario>
{
    public ControllerPropietario(InmobiliariaContext context)
        : base(context)
    {
    }
}