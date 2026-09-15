using Microsoft.AspNetCore.Mvc;
using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Repositories;
using Microsoft.AspNetCore.Authorization;


namespace InmobilariaGrupo6_.Controllers
{
    public class ReservaController : Controller
    {
        private readonly RepositorioReserva _repositorio;

        public ReservaController(RepositorioReserva repositorio)
        {
            _repositorio = repositorio;
        }

        public IActionResult Index()
        {
            var reservas = _repositorio.GetAll();

            return View(reservas);
        }

       
    public IActionResult Create(
    int? idInmueble,
    DateTime? fechaInicio,
    DateTime? fechaFin)
    {
    Console.WriteLine("ID INMUEBLE: " + idInmueble);
    Console.WriteLine("FECHA INICIO: " + fechaInicio);
    Console.WriteLine("FECHA FIN: " + fechaFin);

    ViewBag.IdInmueble = idInmueble;
    ViewBag.FechaInicio = fechaInicio;
    ViewBag.FechaFin = fechaFin;

    return View();
    }



        [HttpPost]
        public IActionResult Create(Reserva reserva)
        {
            if (!ModelState.IsValid)
            {
                return View(reserva);
            }

            _repositorio.Create(reserva);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var reserva = _repositorio.GetById(id);

            if (reserva == null)
            {
                return NotFound();
            }

            return View(reserva);
        }

        [HttpPost]
        public IActionResult Edit(Reserva reserva)
        {
            if (!ModelState.IsValid)
            {
                return View(reserva);
            }

            _repositorio.Update(reserva);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var reserva = _repositorio.GetById(id);

            if (reserva == null)
            {
                return NotFound();
            }

            return View(reserva);
        }

        [Authorize(Roles = "Administrador")]
        public IActionResult DeleteConfirmed(int id)
        {
            _repositorio.Delete(id);

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Details(int id)
{
         var reserva = _repositorio.GetByIdConDetalles(id);

          if (reserva == null)
          {
          return NotFound();
          }

           return View(reserva);
}
    }
}