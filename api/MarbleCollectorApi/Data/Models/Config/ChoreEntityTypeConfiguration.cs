using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarbleCollectorApi.Data.Models.Config
{
    public class ChoreEntityTypeConfiguration : IEntityTypeConfiguration<Chore>
    {
        public void Configure(EntityTypeBuilder<Chore> builder)
        {
            var baseEntityConfig = new BaseEntityTypeConfiguration<Chore>();
            baseEntityConfig.ConfigureKey(builder);
            builder.Property(chore => chore.Name).IsRequired().HasMaxLength(50);
            builder.Property(chore => chore.Description).HasMaxLength(250);
            builder.Property(chore => chore.Value).IsRequired();
            builder.Property(chore => chore.DueDate).IsRequired();
            baseEntityConfig.ConfigureFields(builder);
        }
    }
}
