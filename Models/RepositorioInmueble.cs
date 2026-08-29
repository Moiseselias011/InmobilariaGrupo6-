using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;


namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioInmueble : RepositorioBase<Inmueble>
    {
        public RepositorioInmueble(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}