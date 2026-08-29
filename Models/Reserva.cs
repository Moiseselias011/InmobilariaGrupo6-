using System.ComponentModel.DataAnnotations;

namespace INMOBILIARIAGRUPO6.Models;

public class Reserva
{
    [Key]
    public int IdReserva { get; set; }

    [Required]
    public int IdInquilino { get; set; }

    [Required]
    public int IdInmueble { get; set; }

    [Required]
    public DateTime FechaInicio { get; set; }

    [Required]
    public DateTime FechaFin { get; set; }

    [Required]
    public decimal MontoPorDia { get; set; }
}