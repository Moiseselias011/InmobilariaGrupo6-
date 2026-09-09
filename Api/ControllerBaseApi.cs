using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using   InmobilariaGrupo6_.Data;
namespace InmobilariaGrupo6_.Api.Controllers;

[ApiController]
[Route("Api/[controller]")]
public abstract class ControllersApiBase<T> where T  : class
{
    protected readonly InmobiliariaContext _context;

    public ControllersApiBase(InmobiliariaContext context)
    {
        _context = context ;

    }
    // esto es para listar ...
    public List<T> GetAll()
    {
        return _context.Set<T>().ToList();

    } 
    //esto es para con un id traer el registro, para ver detalles 
    public T? GetById(int id)
    {
        return _context.Set<T>().Find(id);

    }
    // para agregar o crear un registro nuevo :v
    public void Create (T)









}