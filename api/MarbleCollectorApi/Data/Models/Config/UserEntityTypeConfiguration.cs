using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarbleCollectorApi.Data.Models.Config
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            var baseEntityConfig = new BaseEntityTypeConfiguration<User>();
            baseEntityConfig.ConfigureKey(builder);
            builder.Property(user => user.Username).IsRequired().HasMaxLength(20);
            builder.Property(user => user.Email).HasMaxLength(50);
            builder.Property(user => user.Password).HasMaxLength(20);
            builder.Property(user => user.Avatar).HasMaxLength(250);
            builder.Property(user => user.Role).HasMaxLength(20);
            builder.Property(user => user.Family).IsRequired().HasMaxLength(20);
            baseEntityConfig.ConfigureFields(builder);
        }
    }
}
