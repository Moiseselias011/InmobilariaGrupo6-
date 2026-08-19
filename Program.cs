using Microsoft.EntityFrameworkCore;
using INMOBILIARIAGRUPO6.Data;
using INMOBILIARIAGRUPO6.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<InmobiliariaContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<RepositorioInquilino>();


builder.Services.AddControllersWithViews();

builder.Services.AddScoped<RepositorioPropietario>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();