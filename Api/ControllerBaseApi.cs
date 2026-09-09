using Microsoft.AspNetCore.Mvc;
using InmobilariaGrupo6_.Data;

namespace InmobilariaGrupo6_.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ControllersApiBase<T> : ControllerBase where T : class
{
    protected readonly InmobiliariaContext _context;

    public ControllersApiBase(InmobiliariaContext context)
    {
        _context = context;
    }

    [HttpGet]
    public List<T> GetAll()
    {
        return _context.Set<T>().ToList();
    }

    [HttpGet("{id}")]
    public T? GetById(int id)
    {
        return _context.Set<T>().Find(id);
    }

    [HttpPost]
    public void Create(T entidad)
    {
        _context.Set<T>().Add(entidad);
        _context.SaveChanges();
    }

    [HttpPut]
    public void Update(T entidad)
    {
        _context.Set<T>().Update(entidad);
        _context.SaveChanges();
    }

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