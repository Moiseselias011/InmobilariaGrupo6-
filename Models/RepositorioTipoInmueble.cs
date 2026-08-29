using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioTipoInmueble : RepositorioBase<TipoInmueble>
    {
        public RepositorioTipoInmueble(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}