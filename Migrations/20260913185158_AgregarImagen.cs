using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InmobilariaGrupo6_.Migrations
{
    /// <inheritdoc />
    public partial class AgregarImagen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Imagen",
                columns: table => new
                {
                    IdImagen = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdInmueble = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EsPortada = table.Column<bool>(type: "bit", nullable: false),
                    InmuebleIdInmueble = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Imagen", x => x.IdImagen);
                    table.ForeignKey(
                        name: "FK_Imagen_Inmueble_InmuebleIdInmueble",
                        column: x => x.InmuebleIdInmueble,
                        principalTable: "Inmueble",
                        principalColumn: "IdInmueble");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Imagen_InmuebleIdInmueble",
                table: "Imagen",
                column: "InmuebleIdInmueble");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Imagen");
        }
    }
}
