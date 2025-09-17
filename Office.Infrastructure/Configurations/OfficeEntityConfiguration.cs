using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class OfficeEntityConfiguration : IEntityTypeConfiguration<OfficeEntity> {
    public void Configure(EntityTypeBuilder<OfficeEntity> builder) {
      builder.ToTable("offices");
      builder.HasKey(o => o.Id);
      builder.Property(o => o.UserId).IsRequired();
      builder.Property(o => o.OfficeName).HasMaxLength(200).IsRequired();
      builder.Property(o => o.Address).HasMaxLength(500);
      builder.Property(o => o.QrCode).HasMaxLength(500);
      
      // Foreign key relationship
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(o => o.UserId)
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}
