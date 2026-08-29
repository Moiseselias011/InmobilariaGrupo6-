using InmobilariaGrupo6.Models;
using INMOBILIARIAGRUPO6.Data;
using INMOBILIARIAGRUPO6.Models;

namespace INMOBILIARIAGRUPO6.Repositories
{
    public class RepositorioInmueble : RepositorioBase<Inmueble>
    {
        public RepositorioInmueble(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}