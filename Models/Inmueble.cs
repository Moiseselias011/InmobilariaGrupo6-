using System.ComponentModel.DataAnnotations;
using System.Formats.Tar;
using System.Runtime.Intrinsics.X86;

namespace InmobilariaGrupo6.Models;

public class Inmueble
{
        [Key]
        public int IdInmueble { get; set; }
        public int IdPropietario{ get; set; }
        public int IdTipoInmueble{ get; set; } 

         [Required]
         
         public string Direccion { get; set; }
         [Required]
         public int Cupo { get; set; }
         [Required]
         public string? Coordenadas { get; set; }
         [Required]
         public decimal PrecioPorDia { get; set; }
         [Required]
         public bool Disponible { get; set; }
         [Required]
         public string ImagenPortada { get; set; }
         
        



}
