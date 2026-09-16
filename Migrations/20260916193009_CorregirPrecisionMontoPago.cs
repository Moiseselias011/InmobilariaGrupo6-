using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InmobilariaGrupo6_.Migrations
{
    /// <inheritdoc />
    public partial class CorregirPrecisionMontoPago : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioCreacion",
                table: "Reservas");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioTerminacion",
                table: "Reservas");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioCreacion",
                table: "Reservas",
                column: "IdUsuarioCreacion",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioTerminacion",
                table: "Reservas",
                column: "IdUsuarioTerminacion",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioCreacion",
                table: "Reservas");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioTerminacion",
                table: "Reservas");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioCreacion",
                table: "Reservas",
                column: "IdUsuarioCreacion",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioTerminacion",
                table: "Reservas",
                column: "IdUsuarioTerminacion",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario");
        }
    }
}
