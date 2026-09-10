using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;


namespace InmobilariaGrupo6_.Controllers
{
    public class ControllerInmueble :ControllerApiBase<Inmueble>
    {
        public ControllerInmueble(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}