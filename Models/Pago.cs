using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    [Column(TypeName = "decimal(18,2)")]
    public decimal Monto { get; set; }

    [Required]
    public string MetodoPago { get; set; } = string.Empty;

    [Required]
    public int IdUsuarioCreacion { get; set; }

    [ForeignKey("IdUsuarioCreacion")]
    public Usuario? UsuarioCreacion { get; set; }

    public int? IdUsuarioAnulacion { get; set; }

    [ForeignKey("IdUsuarioAnulacion")]
    public Usuario? UsuarioAnulacion { get; set; }

    public bool Anulado { get; set; } = false;
}