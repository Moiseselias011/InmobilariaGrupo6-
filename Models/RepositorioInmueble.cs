using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;
using INMOBILIARIAGRUPO6.Models;

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