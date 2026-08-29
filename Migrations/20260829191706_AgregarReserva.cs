using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InmobilariaGrupo6_.Migrations
{
    /// <inheritdoc />
    public partial class AgregarReserva : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Propietarios",
                table: "Propietarios");

            migrationBuilder.RenameTable(
                name: "Propietarios",
                newName: "Propietario");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Propietario",
                table: "Propietario",
                column: "idPropietario");

            migrationBuilder.CreateTable(
                name: "Reservas",
                columns: table => new
                {
                    IdReserva = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdInquilino = table.Column<int>(type: "int", nullable: false),
                    IdInmueble = table.Column<int>(type: "int", nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MontoPorDia = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservas", x => x.IdReserva);
                });

            migrationBuilder.CreateTable(
                name: "TipoInmueble",
                columns: table => new
                {
                    IdTipoInmueble = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoInmueble", x => x.IdTipoInmueble);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reservas");

            migrationBuilder.DropTable(
                name: "TipoInmueble");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Propietario",
                table: "Propietario");

            migrationBuilder.RenameTable(
                name: "Propietario",
                newName: "Propietarios");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Propietarios",
                table: "Propietarios",
                column: "idPropietario");
        }
    }
}
