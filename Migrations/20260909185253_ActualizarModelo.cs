using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InmobilariaGrupo6_.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarModelo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reservas_IdInmueble",
                table: "Reservas",
                column: "IdInmueble");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_IdInquilino",
                table: "Reservas",
                column: "IdInquilino");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Inmueble_IdInmueble",
                table: "Reservas",
                column: "IdInmueble",
                principalTable: "Inmueble",
                principalColumn: "IdInmueble",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Inquilinos_IdInquilino",
                table: "Reservas",
                column: "IdInquilino",
                principalTable: "Inquilinos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Inmueble_IdInmueble",
                table: "Reservas");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Inquilinos_IdInquilino",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_IdInmueble",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_IdInquilino",
                table: "Reservas");
        }
    }
}
