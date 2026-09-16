using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;
using System.Security.Claims;

namespace InmobilariaGrupo6_.Controllers;

[Authorize]
public class UsuarioController : Controller
{
    private readonly InmobiliariaContext _context;

    public UsuarioController(InmobiliariaContext context)
    {
        _context = context;
    }

    // PERFIL DEL USUARIO LOGUEADO
    public IActionResult Perfil()
    {
        var idUsuario = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (idUsuario == null)
        {
            return RedirectToAction("Index", "Login");
        }

        var usuario = _context.Usuarios
            .FirstOrDefault(u => u.IdUsuario == int.Parse(idUsuario));

        if (usuario == null)
        {
            return NotFound();
        }

        return View(usuario);
    }

    // OBTENER PERFIL PARA VUE
    [HttpGet]
    public IActionResult ObtenerPerfil()
    {
        var idUsuario = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        var usuario = _context.Usuarios
            .FirstOrDefault(u => u.IdUsuario == int.Parse(idUsuario));

        if (usuario == null)
        {
            return NotFound();
        }

        return Json(usuario);
    }

    // ACTUALIZAR PERFIL DEL USUARIO LOGUEADO
    [HttpPost]
    public IActionResult ActualizarPerfil(
        string Nombre,
        string Apellido,
        string Email,
        IFormFile? Avatar)
    {
        var idUsuario = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        var usuarioActual = _context.Usuarios
            .FirstOrDefault(u => u.IdUsuario == int.Parse(idUsuario));

        if (usuarioActual == null)
        {
            return NotFound();
        }

        // Actualizamos solamente los datos permitidos
        usuarioActual.Nombre = Nombre;
        usuarioActual.Apellido = Apellido;
        usuarioActual.Email = Email;

        // Si seleccionó un avatar
        if (Avatar != null && Avatar.Length > 0)
        {
            var carpeta = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "images",
                "avatars"
            );

            if (!Directory.Exists(carpeta))
            {
                Directory.CreateDirectory(carpeta);
            }

            var extension = Path.GetExtension(Avatar.FileName);

            var nombreArchivo = $"{usuarioActual.IdUsuario}{extension}";

            var ruta = Path.Combine(carpeta, nombreArchivo);

            using (var stream = new FileStream(ruta, FileMode.Create))
            {
                Avatar.CopyTo(stream);
            }

            usuarioActual.Avatar = $"/images/avatars/{nombreArchivo}";
        }

        _context.SaveChanges();

        return Json(usuarioActual);
    }


    // ADMINISTRACIÓN DE USUARIOS

    [Authorize(Roles = "Administrador")]
    public IActionResult Index()
    {
        return View();
    }

    [Authorize(Roles = "Administrador")]
    public IActionResult Create()
    {
        return View();
    }

    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public IActionResult Create(Usuario usuario)
    {
        if (ModelState.IsValid)
        {
            return RedirectToAction(nameof(Index));
        }

        return View(usuario);
    }

    [Authorize(Roles = "Administrador")]
    public IActionResult Edit(int id)
    {
        return View();
    }

    [Authorize(Roles = "Administrador")]
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

    [Authorize(Roles = "Administrador")]
    public IActionResult Details(int id)
    {
        return View();
    }

    [Authorize(Roles = "Administrador")]
    public IActionResult Delete(int id)
    {
        return View();
    }

    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public IActionResult DeleteConfirmed(int id)
    {
        return RedirectToAction(nameof(Index));
    }
}