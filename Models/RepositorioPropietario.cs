using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioPropietario : RepositorioBase<Propietario>
    {
        public RepositorioPropietario(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}