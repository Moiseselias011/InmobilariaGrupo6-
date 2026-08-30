using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InmobilariaGrupo6_.Models;

public class Reserva
{
    [Key]
    public int IdReserva { get; set; }

    public int IdInquilino { get; set; }

    public int IdInmueble { get; set; }

    [Required]
    public DateTime FechaInicio { get; set; }

    [Required]
    public DateTime FechaFin { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal MontoPorDia { get; set; }
}