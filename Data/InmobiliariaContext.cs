using Microsoft.EntityFrameworkCore;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Data
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
        public DbSet<Inmueble> Inmueble { get; set; }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Imagen> Imagen { get; set; }
        public DbSet<Pago> Pago { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>().HasData(
                new Usuario
                {
                    IdUsuario = 1,
                    Nombre = "Administrador",
                    Apellido = "Sistema",
                    Email = "admin@inmobiliaria.com",
                    Password = "1234",
                    Rol = "Administrador"
                }
            );

            modelBuilder.Entity<Reserva>()
                .HasOne(r => r.UsuarioCreacion)
                .WithMany()
                .HasForeignKey(r => r.IdUsuarioCreacion)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reserva>()
                .HasOne(r => r.UsuarioTerminacion)
                .WithMany()
                .HasForeignKey(r => r.IdUsuarioTerminacion)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}