using INMOBILIARIAGRUPO6.Data;
using INMOBILIARIAGRUPO6.Models;

namespace INMOBILIARIAGRUPO6.Repositories
{
    public class RepositorioTipoInmueble : RepositorioBase<TipoInmueble>
    {
        public RepositorioTipoInmueble(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}