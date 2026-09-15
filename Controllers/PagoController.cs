
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InmobilariaGrupo6_.Controllers;

public class PagoController : Controller
{
    private readonly RepositorioPago _repositorio;

    public PagoController(RepositorioPago repositorio)
    {
        _repositorio = repositorio;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Create()
    {
        return View();
    }

    public IActionResult Edit(int id)
    {
        return View();
    }

    public IActionResult Delete(int id)
    {
        var pago = _repositorio.GetById(id);

        if (pago == null)
        {
            return NotFound();
        }

        return View(pago);
    }

    [Authorize(Roles = "Administrador")]

    public IActionResult DeleteConfirmed(int id)
    {
        _repositorio.Delete(id);

        return RedirectToAction(nameof(Index));
    }

    public IActionResult Details(int id)
    {
        return View();
    }
}

