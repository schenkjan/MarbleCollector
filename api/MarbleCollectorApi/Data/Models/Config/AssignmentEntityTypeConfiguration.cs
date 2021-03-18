using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarbleCollectorApi.Data.Models.Config
{
    public class AssignmentEntityTypeConfiguration : IEntityTypeConfiguration<Assignment>
    {
        public void Configure(EntityTypeBuilder<Assignment> builder)
        {
            var baseEntityConfig = new BaseEntityTypeConfiguration<Assignment>();
            baseEntityConfig.ConfigureKey(builder);
            builder.Property(assignment => assignment.UserId).IsRequired();
            builder.Property(assignment => assignment.ChoreId).IsRequired();
            builder.Property(assignment => assignment.State).IsRequired();
            builder.HasIndex(assignment => new {assignment.UserId, assignment.ChoreId}).IsUnique();
            baseEntityConfig.ConfigureFields(builder);
        }
    }
}
