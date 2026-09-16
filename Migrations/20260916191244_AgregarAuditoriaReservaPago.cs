using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InmobilariaGrupo6_.Migrations
{
    /// <inheritdoc />
    public partial class AgregarAuditoriaReservaPago : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "FechaTerminacion",
                table: "Reservas",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdUsuarioCreacion",
                table: "Reservas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdUsuarioTerminacion",
                table: "Reservas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Anulado",
                table: "Pago",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "IdUsuarioAnulacion",
                table: "Pago",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdUsuarioCreacion",
                table: "Pago",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_IdUsuarioCreacion",
                table: "Reservas",
                column: "IdUsuarioCreacion");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_IdUsuarioTerminacion",
                table: "Reservas",
                column: "IdUsuarioTerminacion");

            migrationBuilder.CreateIndex(
                name: "IX_Pago_IdUsuarioAnulacion",
                table: "Pago",
                column: "IdUsuarioAnulacion");

            migrationBuilder.CreateIndex(
                name: "IX_Pago_IdUsuarioCreacion",
                table: "Pago",
                column: "IdUsuarioCreacion");

            migrationBuilder.AddForeignKey(
                name: "FK_Pago_Usuarios_IdUsuarioAnulacion",
                table: "Pago",
                column: "IdUsuarioAnulacion",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_Pago_Usuarios_IdUsuarioCreacion",
                table: "Pago",
                column: "IdUsuarioCreacion",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Cascade);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pago_Usuarios_IdUsuarioAnulacion",
                table: "Pago");

            migrationBuilder.DropForeignKey(
                name: "FK_Pago_Usuarios_IdUsuarioCreacion",
                table: "Pago");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioCreacion",
                table: "Reservas");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Usuarios_IdUsuarioTerminacion",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_IdUsuarioCreacion",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_IdUsuarioTerminacion",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Pago_IdUsuarioAnulacion",
                table: "Pago");

            migrationBuilder.DropIndex(
                name: "IX_Pago_IdUsuarioCreacion",
                table: "Pago");

            migrationBuilder.DropColumn(
                name: "FechaTerminacion",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "IdUsuarioCreacion",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "IdUsuarioTerminacion",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "Anulado",
                table: "Pago");

            migrationBuilder.DropColumn(
                name: "IdUsuarioAnulacion",
                table: "Pago");

            migrationBuilder.DropColumn(
                name: "IdUsuarioCreacion",
                table: "Pago");
        }
    }
}
