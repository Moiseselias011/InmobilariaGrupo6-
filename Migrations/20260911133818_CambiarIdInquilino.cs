using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InmobilariaGrupo6_.Migrations
{
    /// <inheritdoc />
    public partial class CambiarIdInquilino : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Inquilinos",
                newName: "IdInquilino");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdInquilino",
                table: "Inquilinos",
                newName: "Id");
        }
    }
}
