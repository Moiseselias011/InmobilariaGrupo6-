using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace InmobilariaGrupo6_.Controllers
{
    public class ImagenController : Controller
    {
        private readonly RepositorioImagen _repositorio;
        private readonly RepositorioInmueble _repositorioInmueble;

        public ImagenController(
            RepositorioImagen repositorio,
            RepositorioInmueble repositorioInmueble)
        {
            _repositorio = repositorio;
            _repositorioInmueble = repositorioInmueble;
        }

        public IActionResult Index()
        {
            var imagenes = _repositorio.GetAll();
            return View(imagenes);
        }

        public IActionResult Create()
        {
            var inmuebles = _repositorioInmueble.GetAll();

            ViewBag.Inmuebles = inmuebles;

            return View();
        }

        [HttpPost]
        public IActionResult Create(Imagen imagen)
        {
            if (!ModelState.IsValid)
            {
                var inmuebles = _repositorioInmueble.GetAll();
                ViewBag.Inmuebles = inmuebles;

                return View(imagen);
            }

            _repositorio.Create(imagen);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var imagen = _repositorio.GetById(id);

            if (imagen == null)
            {
                return NotFound();
            }

            var inmuebles = _repositorioInmueble.GetAll();
            ViewBag.Inmuebles = inmuebles;

            return View(imagen);
        }

        [HttpPost]
        public IActionResult Edit(Imagen imagen)
        {
            if (!ModelState.IsValid)
            {
                var inmuebles = _repositorioInmueble.GetAll();
                ViewBag.Inmuebles = inmuebles;

                return View(imagen);
            }

            _repositorio.Update(imagen);

            return RedirectToAction(nameof(Index));
        }
        
        public IActionResult Delete(int id)
        {
            var imagen = _repositorio.GetById(id);

            if (imagen == null)
            {
                return NotFound();
            }

            return View(imagen);
        }

        [Authorize(Roles = "Administrador")]
        public IActionResult DeleteConfirmed(int id)
        {
            _repositorio.Delete(id);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Details(int id)
        {
            var imagen = _repositorio.GetById(id);

            if (imagen == null)
            {
                return NotFound();
            }

            return View(imagen);
        }
    }
}