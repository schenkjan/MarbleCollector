using Microsoft.EntityFrameworkCore.Migrations;

namespace MarbleCollectorApi.Data.Migrations
{
    public partial class UniqueIndexForAssignment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Assignments_UserId",
                table: "Assignments");

            migrationBuilder.CreateIndex(
                name: "IX_Assignments_UserId_ChoreId",
                table: "Assignments",
                columns: new[] { "UserId", "ChoreId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Assignments_UserId_ChoreId",
                table: "Assignments");

            migrationBuilder.CreateIndex(
                name: "IX_Assignments_UserId",
                table: "Assignments",
                column: "UserId");
        }
    }
}
