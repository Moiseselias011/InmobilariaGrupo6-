using InmobilariaGrupo6_.Data;
using InmobilariaGrupo6_.Models;

namespace InmobilariaGrupo6_.Repositories
{
    public class RepositorioPago : RepositorioBase<Pago>
    {
        public RepositorioPago(InmobiliariaContext context)
            : base(context)
        {
        }
    }
}