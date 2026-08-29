using System.ComponentModel.DataAnnotations;

namespace InmobilariaGrupo6_.Models;

public class Inquilino
{
    [Key]
    public int Id { get; set; }

    
    public string DNI { get; set; } = string.Empty;

    [Required]
    public string NombreCompleto { get; set; } = string.Empty;
    [Required]
    public string Telefono { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;
}