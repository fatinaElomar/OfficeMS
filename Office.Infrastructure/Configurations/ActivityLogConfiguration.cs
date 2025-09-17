using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class ActivityLogConfiguration : IEntityTypeConfiguration<ActivityLog> {
    public void Configure(EntityTypeBuilder<ActivityLog> builder) {
      builder.ToTable("activity_logs");
      builder.HasKey(al => al.Id);
      builder.Property(al => al.Action).HasMaxLength(100);
      builder.Property(al => al.Details).HasMaxLength(1000);
      builder.Property(al => al.CreatedAt).IsRequired();
      
      // Foreign key relationship
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(al => al.UserId)
        .OnDelete(DeleteBehavior.SetNull);
    }
  }
}
