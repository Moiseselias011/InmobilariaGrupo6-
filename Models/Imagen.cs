using System.ComponentModel.DataAnnotations;

namespace InmobilariaGrupo6_.Models;

public class Imagen
{
    [Key]
    public int IdImagen { get; set; }

    public int IdInmueble { get; set; }

    public string Url { get; set; } = "";

    public bool EsPortada { get; set; }

    public Inmueble? Inmueble { get; set; }
}