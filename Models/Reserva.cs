using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InmobilariaGrupo6_.Models;

public class Reserva
{
    [Key]
    public int IdReserva { get; set; }

    public int IdInquilino { get; set; }

    [ForeignKey("IdInquilino")]
    public Inquilino? Inquilino { get; set; }

    public int IdInmueble { get; set; }

    [ForeignKey("IdInmueble")]
    public Inmueble? Inmueble { get; set; }

    [Required]
    public DateTime FechaInicio { get; set; }

    [Required]
    public DateTime FechaFin { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal MontoPorDia { get; set; }


    // Auditoría: usuario que creó la reserva
    [Required]
    public int IdUsuarioCreacion { get; set; }

    [ForeignKey("IdUsuarioCreacion")]
    public Usuario? UsuarioCreacion { get; set; }


    // Auditoria: usuario que terminó la reserva
    public int? IdUsuarioTerminacion { get; set; }

    [ForeignKey("IdUsuarioTerminacion")]
    public Usuario? UsuarioTerminacion { get; set; }

    // Fecha efectiva de terminacion anticipada
    public DateTime? FechaTerminacion { get; set; }
}