
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

