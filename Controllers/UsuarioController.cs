using Microsoft.AspNetCore.Mvc;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Controllers;

public class UsuarioController : Controller
{
    // GET: Usuario
    public IActionResult Index()
    {
        return View();
    }

    // GET: Usuario/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Usuario/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Create(Usuario usuario)
    {
        if (ModelState.IsValid)
        {
            return RedirectToAction(nameof(Index));
        }

        return View(usuario);
    }

    // GET: Usuario/Edit/5
    public IActionResult Edit(int id)
    {
        return View();
    }

    // POST: Usuario/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(int id, Usuario usuario)
    {
        if (id != usuario.IdUsuario)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            return RedirectToAction(nameof(Index));
        }

        return View(usuario);
    }

    // GET: Usuario/Details/5
    public IActionResult Details(int id)
    {
        return View();
    }

    // GET: Usuario/Delete/5
    public IActionResult Delete(int id)
    {
        return View();
    }

    // POST: Usuario/Delete/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DeleteConfirmed(int id)
    {
        return RedirectToAction(nameof(Index));
    }
}