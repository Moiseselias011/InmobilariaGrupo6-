using Microsoft.AspNetCore.Mvc;
using INMOBILIARIAGRUPO6.Models;
using INMOBILIARIAGRUPO6.Repositories;

namespace INMOBILIARIAGRUPO6.Controllers
{
    public class PropietarioController : Controller
    {
        private readonly RepositorioPropietario _repositorio;

        public PropietarioController(RepositorioPropietario repositorio)
        {
            _repositorio = repositorio;
        }

        public IActionResult Index()
        {
            var propietarios = _repositorio.GetAll();
            return View(propietarios);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Propietario propietario)
        {
            if (!ModelState.IsValid)
            {
                return View(propietario);
            }

            _repositorio.Create(propietario);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var propietario = _repositorio.GetById(id);

            if (propietario == null)
            {
                return NotFound();
            }

            return View(propietario);
        }

        [HttpPost]
        public IActionResult Edit(Propietario propietario)
        {
            if (!ModelState.IsValid)
            {
                return View(propietario);
            }

            _repositorio.Update(propietario);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var propietario = _repositorio.GetById(id);

            if (propietario == null)
            {
                return NotFound();
            }

            return View(propietario);
        }

        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            _repositorio.Delete(id);

            return RedirectToAction(nameof(Index));
        }
    }
}