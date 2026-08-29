using Microsoft.AspNetCore.Mvc;
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Repositories;

namespace InmobilariaGrupo6_.Controllers
{
    public class TipoInmuebleController : Controller
    {
        private readonly RepositorioTipoInmueble _repositorio;

        public TipoInmuebleController(RepositorioTipoInmueble repositorio)
        {
            _repositorio = repositorio;
        }

        public IActionResult Index()
        {
            var TipoInmueble = _repositorio.GetAll();
            return View(TipoInmueble);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(TipoInmueble tipoinmueble)
        {
            if (!ModelState.IsValid)
            {
                return View(tipoinmueble);
            }

            _repositorio.Create(tipoinmueble);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var tipoinmueble = _repositorio.GetById(id);

            if (tipoinmueble == null)
            {
                return NotFound();
            }

            return View(tipoinmueble);
        }

        [HttpPost]
        public IActionResult Edit(TipoInmueble tipoInmueble)
        {
            if (!ModelState.IsValid)
            {
                return View(tipoInmueble);
            }

            _repositorio.Update(tipoInmueble);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var tipoInmueble = _repositorio.GetById(id);

            if (tipoInmueble == null)
            {
                return NotFound();
            }

            return View(tipoInmueble);
        }

        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            _repositorio.Delete(id);

            return RedirectToAction(nameof(Index));
        }


         public IActionResult Details(int id)
        {
            var tipoInmueble = _repositorio.GetById(id);

            if (tipoInmueble == null)
            {
                return NotFound();
            }

            return View(tipoInmueble);
        } 






    }
}
















    






























