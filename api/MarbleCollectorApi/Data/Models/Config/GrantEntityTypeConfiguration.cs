using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarbleCollectorApi.Data.Models.Config
{
    public class GrantEntityTypeConfiguration : IEntityTypeConfiguration<Grant>
    {
        public void Configure(EntityTypeBuilder<Grant> builder)
        {
            var baseEntityConfig = new BaseEntityTypeConfiguration<Grant>();
            baseEntityConfig.ConfigureKey(builder);
            builder.Property(grant => grant.UserId).IsRequired();
            builder.Property(grant => grant.RewardId).IsRequired();
            builder.Property(grant => grant.State).IsRequired();
            builder.HasIndex(grant => new { grant.UserId, grant.RewardId }).IsUnique();
            baseEntityConfig.ConfigureFields(builder);
        }
    }
}
