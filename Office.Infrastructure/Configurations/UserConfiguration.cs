using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class UserConfiguration : IEntityTypeConfiguration<User> {
    public void Configure(EntityTypeBuilder<User> builder) {
      builder.ToTable("users");
      builder.HasKey(u => u.Id);
      builder.Property(u => u.Email).HasMaxLength(200).IsRequired();
      builder.Property(u => u.Name).HasMaxLength(200);
      builder.Property(u => u.Password).HasMaxLength(500).IsRequired();
      builder.Property(u => u.Phone).HasMaxLength(20);
      builder.Property(u => u.Role).HasMaxLength(50);
      builder.Property(u => u.Status).HasMaxLength(50);
      builder.Property(u => u.CreatedAt).IsRequired();
      builder.Property(u => u.UpdatedAt).IsRequired();
      builder.Property(u => u.IsEmailVerified).HasDefaultValue(false).IsRequired();
      builder.Property(u => u.EmailVerificationToken).HasMaxLength(200);
      builder.Property(u => u.EmailVerifiedAt);
      builder.Property(u => u.EmailVerificationSentAt);
      
      // Create unique index on email
      builder.HasIndex(u => u.Email).IsUnique();
    }
  }
}
