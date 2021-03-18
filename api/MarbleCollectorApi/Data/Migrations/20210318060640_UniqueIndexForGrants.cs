using Microsoft.EntityFrameworkCore.Migrations;

namespace MarbleCollectorApi.Data.Migrations
{
    public partial class UniqueIndexForGrants : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Grants_UserId",
                table: "Grants");

            migrationBuilder.CreateIndex(
                name: "IX_Grants_UserId_RewardId",
                table: "Grants",
                columns: new[] { "UserId", "RewardId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Grants_UserId_RewardId",
                table: "Grants");

            migrationBuilder.CreateIndex(
                name: "IX_Grants_UserId",
                table: "Grants",
                column: "UserId");
        }
    }
}
