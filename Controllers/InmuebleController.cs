using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InmobilariaGrupo6_.Controllers
{

 public class InmuebleController : Controller
    {
        private readonly RepositorioInmueble _repositorio;

        public InmuebleController(RepositorioInmueble repositorio)
        {
            _repositorio = repositorio;
        }

        public IActionResult Index()
        {
            var Inmueble = _repositorio.GetAll();
            return View(Inmueble);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Inmueble inmueble)
        {
            if (!ModelState.IsValid)
            {
                return View(inmueble);
            }

            _repositorio.Create(inmueble);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var inmueble = _repositorio.GetById(id);

            if (inmueble == null)
            {
                return NotFound();
            }

            return View(inmueble);
        }

        [HttpPost]
        public IActionResult Edit(Inmueble inmueble)
        {
            if (!ModelState.IsValid)
            {
                return View(inmueble);
            }

            _repositorio.Update(inmueble);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var inmueble = _repositorio.GetById(id);

            if (inmueble == null)
            {
                return NotFound();
            }

            return View(inmueble);
        }

        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            _repositorio.Delete(id);

            return RedirectToAction(nameof(Index));
        }
             public IActionResult Details(int id)
        {
            var inmueble = _repositorio.GetById(id);

            if (inmueble == null)
            {
                return NotFound();
            }

            return View(inmueble);
        } 

    }








}










