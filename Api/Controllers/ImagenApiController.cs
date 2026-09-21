using InmobilariaGrupo6_.Api.Controllers;
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;
using Microsoft.AspNetCore.Mvc;

namespace InmobilariaGrupo6_.Controllers
{
    public class ControllerImagen : ControllerApiBase<Imagen>
    {
        private readonly IWebHostEnvironment _environment;

        public ControllerImagen(
            InmobiliariaContext context,
            IWebHostEnvironment environment)
            : base(context)
        {
            _environment = environment;
        }

        [HttpPost("subir")]
        public async Task<IActionResult> Subir(
            [FromForm] int idInmueble,
            [FromForm] List<IFormFile> archivos,
            [FromForm] string portada)
        {
            if (idInmueble <= 0)
            {
                return BadRequest("Debe seleccionar un inmueble.");
            }

            if (archivos == null || archivos.Count == 0)
            {
                return BadRequest("Debe seleccionar al menos una imagen.");
            }

            var carpeta = Path.Combine(
                _environment.WebRootPath,
                "images",
                "Inmuebles"
            );

            if (!Directory.Exists(carpeta))
            {
                Directory.CreateDirectory(carpeta);
            }

            foreach (var archivo in archivos)
            {
                if (archivo.Length == 0)
                {
                    continue;
                }

                var extension = Path.GetExtension(archivo.FileName)
                    .ToLowerInvariant();

                var extensionesPermitidas = new[]
                {
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".webp"
                };

                if (!extensionesPermitidas.Contains(extension))
                {
                    return BadRequest(
                        "Solo se permiten imágenes JPG, JPEG, PNG o WEBP."
                    );
                }

                var nombreArchivo =
                    Guid.NewGuid().ToString("N") + extension;

                var rutaFisica = Path.Combine(
                    carpeta,
                    nombreArchivo
                );

                using var stream = new FileStream(
                    rutaFisica,
                    FileMode.Create
                );

                await archivo.CopyToAsync(stream);

                var url =
                    "/images/Inmuebles/" + nombreArchivo;

                var imagen = new Imagen
                {
                    IdInmueble = idInmueble,
                    Url = url,
                    EsPortada = archivo.FileName == portada
                };

                _context.Imagen.Add(imagen);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Imágenes subidas correctamente."
            });
        }

        [HttpGet("archivos")]
        public IActionResult ObtenerArchivos()
        {
            var carpeta = Path.Combine(
                _environment.WebRootPath,
                "images",
                "Inmuebles"
            );

            if (!Directory.Exists(carpeta))
            {
                return Ok(new List<string>());
            }

            var archivos = Directory
                .GetFiles(carpeta)
                .Select(Path.GetFileName)
                .Where(nombre =>
                    nombre.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) ||
                    nombre.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase) ||
                    nombre.EndsWith(".png", StringComparison.OrdinalIgnoreCase) ||
                    nombre.EndsWith(".webp", StringComparison.OrdinalIgnoreCase)
                )
                .Select(nombre => "/images/Inmuebles/" + nombre)
                .ToList();

            return Ok(archivos);
        }
    }
}