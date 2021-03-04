using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarbleCollectorApi.Data.Models.Config
{
    public class RewardEntityTypeConfiguration : IEntityTypeConfiguration<Reward>
    {
        public void Configure(EntityTypeBuilder<Reward> builder)
        {
            var baseEntityConfig = new BaseEntityTypeConfiguration<Reward>();
            baseEntityConfig.ConfigureKey(builder);
            builder.Property(reward => reward.Name).IsRequired().HasMaxLength(50);
            builder.Property(reward => reward.Description).HasMaxLength(250);
            builder.Property(reward => reward.Value).IsRequired();
            baseEntityConfig.ConfigureFields(builder);
        }
    }
}
