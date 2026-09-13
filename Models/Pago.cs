using System.ComponentModel.DataAnnotations;

namespace InmobilariaGrupo6_.Models;

public class Pago
{
    [Key]
    public int IdPago { get; set; }

    [Required]
    public int IdReserva { get; set; }

    [Required]
    public DateTime FechaPago { get; set; }

    [Required]
    public decimal Monto { get; set; }

    [Required]
    public string MetodoPago { get; set; } = string.Empty;
}