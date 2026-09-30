using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InmobilariaGrupo6_.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarPasswordAdministrador : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Usuarios",
                keyColumn: "IdUsuario",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$PYn7nifyARnalD1Cf.Bo.OAM8QSKjtryumw6MEY.BZ4IpDbU68ZZ2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Usuarios",
                keyColumn: "IdUsuario",
                keyValue: 1,
                column: "Password",
                value: "1234");
        }
    }
}
