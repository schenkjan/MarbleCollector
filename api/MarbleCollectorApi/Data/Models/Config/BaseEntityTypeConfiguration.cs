using MarbleCollectorApi.Data.Models.Core;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarbleCollectorApi.Data.Models.Config
{
    public class BaseEntityTypeConfiguration<T> where T : class, IBaseEntity, new()
    {
        public void ConfigureKey(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(entity => entity.Id);
        }

        public void ConfigureFields(EntityTypeBuilder<T> builder)
        {
            builder.Property(entity => entity.Created).IsRequired();
            builder.Property(entity => entity.CreatedBy).IsRequired();
            builder.Property(entity => entity.Modified).IsRequired();
            builder.Property(entity => entity.ModifiedBy).IsRequired();
        }
    }
}
