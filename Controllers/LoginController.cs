
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using InmobilariaGrupo6_.Data;

namespace InmobilariaGrupo6_.Controllers;

public class LoginController : Controller
{
    private readonly InmobiliariaContext _context;

    public LoginController(InmobiliariaContext context)
    {
        _context = context;
    }


    [HttpGet]
    public IActionResult Index()
    {
        // Si ya está logueado, lo mandamos al inicio
        if (User.Identity != null && User.Identity.IsAuthenticated)
        {
            return RedirectToAction("Index", "Home");
        }

        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Index(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) ||
            string.IsNullOrWhiteSpace(password))
        {
            ViewBag.Error = "Debe ingresar email y contraseña.";
            return View();
        }

        var usuario = _context.Usuarios
            .FirstOrDefault(u =>
                u.Email == email &&
                u.Password == password);

        if (usuario == null)
        {
            ViewBag.Error = "Email o contraseña incorrectos.";
            return View();
        }

        // Creamos las identidades del usuario
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
            new Claim(ClaimTypes.Name, usuario.Nombre),
            new Claim(ClaimTypes.Email, usuario.Email),
            new Claim(ClaimTypes.Role, usuario.Rol)
        };

        var identidad = new ClaimsIdentity(
            claims,
            CookieAuthenticationDefaults.AuthenticationScheme);

        var propiedades = new AuthenticationProperties
        {
            IsPersistent = true
        };

        // Creamos la cookie de autenticación
        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identidad),
            propiedades);

        return RedirectToAction("Index", "Home");
    }

    
    [HttpGet]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);

        return RedirectToAction(nameof(Index));
    }

    
    [HttpGet]
    public IActionResult AccesoDenegado()
    {
        return View();
    }
}

