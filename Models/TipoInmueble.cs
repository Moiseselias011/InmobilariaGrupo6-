using System.ComponentModel.DataAnnotations;

namespace InmobilariaGrupo6_.Models
{
public class TipoInmueble
    {
    [Key]
      public int IdTipoInmueble  { get; set; }

    [Required]
      public string Nombre { get; set; }

    }

}