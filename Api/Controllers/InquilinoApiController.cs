using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Controllers;

public class ControllerInquilino : ControllerApiBase<Inquilino>
{
    public ControllerInquilino(InmobiliariaContext context)
        : base(context)
    {
    }
}