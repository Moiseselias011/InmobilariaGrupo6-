using System.ComponentModel.DataAnnotations;

namespace INMOBILIARIAGRUPO6.Models;

public class Inquilino
{
    public int Id { get; set; }

    [Required]
    public string DNI { get; set; } = string.Empty;

    [Required]
    public string NombreCompleto { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
}