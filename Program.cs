using Microsoft.EntityFrameworkCore;
using  InmobilariaGrupo6_.Data;
using  InmobilariaGrupo6_.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<InmobiliariaContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<RepositorioInquilino>();
builder.Services.AddScoped<RepositorioTipoInmueble>();
builder.Services.AddScoped<RepositorioPropietario>();
builder.Services.AddScoped<RepositorioInmueble>();
builder.Services.AddScoped<RepositorioReserva>();

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();