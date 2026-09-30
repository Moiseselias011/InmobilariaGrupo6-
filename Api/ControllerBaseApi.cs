using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using InmobilariaGrupo6_.Data;

namespace InmobilariaGrupo6_.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Empleado,Administrador")]
public abstract class ControllerApiBase<T> : ControllerBase where T : class
{
    protected readonly InmobiliariaContext _context;

    public ControllerApiBase(InmobiliariaContext context)
    {
        _context = context;
    }

    [HttpGet]
    public List<T> GetAll()
    {
        return _context.Set<T>().ToList();
    }

    [HttpGet("paginado")]
    public async Task<IActionResult> GetPaginado(
        int pagina = 1,
        int cantidad = 10,
        string? buscar = null,
        string? campo = null)
    {
        if (pagina < 1)
        {
            pagina = 1;
        }

        if (cantidad < 1)
        {
            cantidad = 10;
        }

        if (cantidad > 100)
        {
            cantidad = 100;
        }

        var consulta = _context.Set<T>()
            .AsQueryable();

        if (
            !string.IsNullOrWhiteSpace(buscar) &&
            !string.IsNullOrWhiteSpace(campo)
        )
        {
            consulta = consulta.Where(entidad =>
                EF.Property<string>(
                    entidad,
                    campo
                ).Contains(buscar)
            );
        }

        var total = await consulta.CountAsync();

        var datos = await consulta
            .Skip((pagina - 1) * cantidad)
            .Take(cantidad)
            .ToListAsync();

        return Ok(new
        {
            datos,
            pagina,
            cantidad,
            total,
            totalPaginas = (int)Math.Ceiling(
                (double)total / cantidad
            )
        });
    }

    [HttpGet("{id}")]
    public T? GetById(int id)
    {
        return _context.Set<T>().Find(id);
    }

    [HttpPost]
    public virtual void Create(T entidad)
    {
        _context.Set<T>().Add(entidad);
        _context.SaveChanges();
    }

    [HttpPut]
    public virtual void Update(T entidad)
    {
        _context.Set<T>().Update(entidad);
        _context.SaveChanges();
    }

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var entidad = GetById(id);

        if (entidad != null)
        {
            _context.Set<T>().Remove(entidad);
            _context.SaveChanges();
        }
    }
}