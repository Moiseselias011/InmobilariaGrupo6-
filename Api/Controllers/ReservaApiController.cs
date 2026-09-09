using Microsoft.EntityFrameworkCore;
using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Controllers;


    public class ControllerReserva : ControllerApiBase<Reserva>
    {
        public ControllerReserva(InmobiliariaContext context)
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