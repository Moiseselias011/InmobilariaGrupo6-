using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace InmobilariaGrupo6_.Controllers
{
    [Authorize(Roles = "Empleado,Administrador")]
    public class InquilinoController : Controller
    {
        private readonly RepositorioInquilino _repositorio;

        public InquilinoController(RepositorioInquilino repositorio)
        {
            _repositorio = repositorio;
        }

        public IActionResult Index()
        {
            var inquilino = _repositorio.GetAll();
            return View(inquilino);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Inquilino inquilino)
        {
            if (!ModelState.IsValid)
            {
                return View(inquilino);
            }

            _repositorio.Create(inquilino);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var inquilino = _repositorio.GetById(id);

            if (inquilino == null)
            {
                return NotFound();
            }

            return View(inquilino);
        }

        [HttpPost]
        public IActionResult Edit(Inquilino inquilino)
        {
            if (!ModelState.IsValid)
            {
                return View(inquilino);
            }

            _repositorio.Update(inquilino);

            return RedirectToAction(nameof(Index));
        }

        [Authorize(Roles = "Administrador")]
        public IActionResult Delete(int id)
        {
            var inquilino = _repositorio.GetById(id);

            if (inquilino == null)
            {
                return NotFound();
            }

            return View(inquilino);
        }

        [Authorize(Roles = "Administrador")]
        public IActionResult DeleteConfirmed(int id)
        {
            _repositorio.Delete(id);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Details(int id)
        {
            var inquilino = _repositorio.GetById(id);

            if (inquilino == null)
            {
                return NotFound();
            }

            return View(inquilino);
        }
    }
}









