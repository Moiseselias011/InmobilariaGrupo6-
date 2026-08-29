using Microsoft.EntityFrameworkCore;
using INMOBILIARIAGRUPO6.Models;

namespace  INMOBILIARIAGRUPO6.Data
{
    public class InmobiliariaContext : DbContext
    {
        public InmobiliariaContext(DbContextOptions<InmobiliariaContext> options)
            : base(options)
        {
        }
        public DbSet<TipoInmueble> TipoInmueble { get; set; }
        public DbSet<Propietario> Propietario { get; set; }
        public DbSet<Inquilino> Inquilinos { get; set; }
        public DbSet<Reserva> Reservas { get; set; }

    }
}