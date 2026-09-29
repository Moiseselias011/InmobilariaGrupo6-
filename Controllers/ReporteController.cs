using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InmobilariaGrupo6_.Controllers
{
    [Authorize(Roles = "Empleado,Administrador")]
    public class ReporteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}