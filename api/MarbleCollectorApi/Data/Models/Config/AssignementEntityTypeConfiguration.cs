using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarbleCollectorApi.Data.Models.Config
{
    public class AssignementEntityTypeConfiguration : IEntityTypeConfiguration<Assignment>
    {
        public void Configure(EntityTypeBuilder<Assignment> builder)
        {
            var baseEntityConfig = new BaseEntityTypeConfiguration<Assignment>();
            baseEntityConfig.ConfigureKey(builder);
            builder.Property(assignement => assignement.UserId).IsRequired();
            builder.Property(assignement => assignement.ChoreId).IsRequired();
            builder.Property(assignement => assignement.State).IsRequired();
            baseEntityConfig.ConfigureFields(builder);
        }
    }
}
