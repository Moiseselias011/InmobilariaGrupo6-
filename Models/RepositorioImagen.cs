using InmobilariaGrupo6_.Models;
using InmobilariaGrupo6_.Data;


namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioImagen : RepositorioBase<Imagen>
    {
        public RepositorioImagen (InmobiliariaContext context)
            : base(context)
        {
        }
    }
}