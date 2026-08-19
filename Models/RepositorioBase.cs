using Microsoft.EntityFrameworkCore;
using INMOBILIARIAGRUPO6.Data;

namespace INMOBILIARIAGRUPO6.Repositories
{
    public class RepositorioBase<T> where T : class
    {
        protected readonly InmobiliariaContext _context;

        public RepositorioBase(InmobiliariaContext context)
        {
            _context = context;
        }

        public List<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public T? GetById(int id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Create(T entidad)
        {
            _context.Set<T>().Add(entidad);
            _context.SaveChanges();
        }

        public void Update(T entidad)
        {
            _context.Set<T>().Update(entidad);
            _context.SaveChanges();
        }

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
}