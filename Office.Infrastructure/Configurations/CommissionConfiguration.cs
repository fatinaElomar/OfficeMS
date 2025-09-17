using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class CommissionConfiguration : IEntityTypeConfiguration<Commission> {
    public void Configure(EntityTypeBuilder<Commission> builder) {
      builder.ToTable("commissions");
      builder.HasKey(c => c.Id);
      builder.Property(c => c.CommissionPercentage).HasColumnType("decimal(5,2)");
      builder.Property(c => c.CommissionAmount).HasColumnType("decimal(18,2)");
      builder.Property(c => c.CreatedAt).IsRequired();
      
      // Foreign key relationships
      builder.HasOne<OfficeEntity>()
        .WithMany()
        .HasForeignKey(c => c.OfficeId)
        .OnDelete(DeleteBehavior.SetNull);
        
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(c => c.LawyerId)
        .OnDelete(DeleteBehavior.SetNull);
        
      builder.HasOne<LegalRequest>()
        .WithMany()
        .HasForeignKey(c => c.RequestId)
        .OnDelete(DeleteBehavior.SetNull);
    }
  }
}
