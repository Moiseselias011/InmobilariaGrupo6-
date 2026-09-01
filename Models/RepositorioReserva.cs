using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;
using Microsoft.EntityFrameworkCore;

namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioReserva : RepositorioBase<Reserva>
    {
        public RepositorioReserva(InmobiliariaContext context)
            : base(context)
        {
        }

        public Reserva? GetByIdConDetalles(int id)
        {
            return _context.Set<Reserva>()
                .Include(r => r.Inquilino)
                .Include(r => r.Inmueble)
                .FirstOrDefault(r => r.IdReserva == id);
        }
    }
}