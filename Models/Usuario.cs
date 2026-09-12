using System.ComponentModel.DataAnnotations;

namespace InmobilariaGrupo6_.Models;

public class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    [Required]
    public string Nombre { get; set; }

    [Required]
    public string Apellido { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    public string Rol { get; set; }
}