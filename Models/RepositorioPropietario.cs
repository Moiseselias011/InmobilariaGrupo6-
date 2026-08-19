using INMOBILIARIAGRUPO6.Data;
using INMOBILIARIAGRUPO6.Models;

namespace INMOBILIARIAGRUPO6.Repositories
{
    public class RepositorioPropietario : RepositorioBase<Propietario>
    {
        public RepositorioPropietario(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}