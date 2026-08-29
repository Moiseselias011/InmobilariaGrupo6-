using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioInquilino : RepositorioBase<Inquilino>
    {
        public RepositorioInquilino(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}