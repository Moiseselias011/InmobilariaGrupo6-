using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Repositories;

public class RepositorioUsuario : RepositorioBase<Usuario>
{
    public RepositorioUsuario(InmobiliariaContext context)
        : base(context)
    {
    }
}