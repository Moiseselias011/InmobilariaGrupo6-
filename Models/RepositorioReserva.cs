using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioReserva : RepositorioBase<Reserva>
    {
        public RepositorioReserva(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}