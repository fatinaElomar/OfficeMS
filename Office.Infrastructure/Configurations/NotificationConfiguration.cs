using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class NotificationConfiguration : IEntityTypeConfiguration<Notification> {
    public void Configure(EntityTypeBuilder<Notification> builder) {
      builder.ToTable("notifications");
      builder.HasKey(n => n.Id);
      builder.Property(n => n.Type).HasMaxLength(50);
      builder.Property(n => n.Title).HasMaxLength(200);
      builder.Property(n => n.Message).HasMaxLength(1000);
      builder.Property(n => n.IsRead).IsRequired();
      builder.Property(n => n.CreatedAt).IsRequired();
      
      // Foreign key relationship
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(n => n.UserId)
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}
