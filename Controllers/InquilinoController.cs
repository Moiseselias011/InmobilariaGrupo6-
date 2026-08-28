using INMOBILIARIAGRUPO6.Models;
using INMOBILIARIAGRUPO6.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace INMOBILIARIAGRUPO6.Controllers
{

 public class InquilinoController : Controller
    {
        private readonly RepositorioInquilino _repositorio;

        public InquilinoController(RepositorioInquilino repositorio)
        {
            _repositorio = repositorio;
        }

        public IActionResult Index()
        {
            var Inquilino = _repositorio.GetAll();
            return View(Inquilino);
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

        public IActionResult Delete(int id)
        {
            var inquilino = _repositorio.GetById(id);

            if (inquilino == null)
            {
                return NotFound();
            }

            return View(inquilino);
        }

        [HttpPost]
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










