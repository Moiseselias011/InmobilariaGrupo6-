using INMOBILIARIAGRUPO6.Data;
using INMOBILIARIAGRUPO6.Models;

namespace INMOBILIARIAGRUPO6.Repositories
{
    public class RepositorioInquilino : RepositorioBase<Inquilino>
    {
        public RepositorioInquilino(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}