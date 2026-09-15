using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Controllers;

[Authorize(Roles = "Administrador")]
public class UsuarioController : Controller
{
    //  Usuario
    public IActionResult Index()
    {
        return View();
    }

    //  Usuario/Create
    public IActionResult Create()
    {
        return View();
    }

    //  Usuario/Create
    [HttpPost]
    
    public IActionResult Create(Usuario usuario)
    {
        if (ModelState.IsValid)
        {
            return RedirectToAction(nameof(Index));
        }

        return View(usuario);
    }

    // Usuario/Edit
    public IActionResult Edit(int id)
    {
        return View();
    }

    //  Usuario/Edit
    [HttpPost]
    
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
    //  Usuario/Details
    public IActionResult Details(int id)
    {
        return View();
    }

    //  Usuario/Delete
    public IActionResult Delete(int id)
    {
        return View();
    }

    // Usuario/Delete
    [HttpPost]
    
    public IActionResult DeleteConfirmed(int id)
    {
        return RedirectToAction(nameof(Index));
    }
}