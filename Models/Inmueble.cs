using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InmobilariaGrupo6_.Models;

public class Inmueble
{
    [Key]
    public int IdInmueble { get; set; }

    public int IdPropietario { get; set; }

    public int IdTipoInmueble { get; set; }

    [Required]
    public string Direccion { get; set; }

    [Required]
    public int Cupo { get; set; }

    public string? Coordenadas { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    public decimal PrecioPorDia { get; set; }

    [Required]
    public bool Disponible { get; set; }

    public string? ImagenPortada { get; set; }
}