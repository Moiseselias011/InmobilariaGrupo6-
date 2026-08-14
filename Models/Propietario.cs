using System.ComponentModel.DataAnnotations;

namespace INMOBILIARIAGRUPO6.Models
{
    public class Propietario
    {
    [Key]
    public int idPropietario {get ; set ;}
    [Required]
    public string nombre {get ; set ; }
    [Required]
    public string apellido {get ; set ; }
    [Required]
    public string dni {get ; set ;}
    public string telefono {get ; set; }
    public string email {get ; set ;}
    



    }       
}