using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class LegalRequestConfiguration : IEntityTypeConfiguration<LegalRequest> {
    public void Configure(EntityTypeBuilder<LegalRequest> builder) {
      builder.ToTable("legal_requests");
      builder.HasKey(lr => lr.Id);
      builder.Property(lr => lr.ClientId).IsRequired();
      builder.Property(lr => lr.Title).HasMaxLength(200).IsRequired();
      builder.Property(lr => lr.Description).HasMaxLength(2000);
      builder.Property(lr => lr.Status).HasMaxLength(50);
      
      // Foreign key relationships
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(lr => lr.ClientId)
        .OnDelete(DeleteBehavior.Restrict);
        
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(lr => lr.LawyerId)
        .OnDelete(DeleteBehavior.SetNull);
        
      builder.HasOne<OfficeEntity>()
        .WithMany()
        .HasForeignKey(lr => lr.OfficeId)
        .OnDelete(DeleteBehavior.SetNull);
    }
  }
}
