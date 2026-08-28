using System.ComponentModel.DataAnnotations;

namespace INMOBILIARIAGRUPO6.Models
{
public class TipoInmueble
    {
    [Key]
      public int IdTipoInmueble  { get; set; }

    [Required]
      public string Nombre { get; set; }

    }

}