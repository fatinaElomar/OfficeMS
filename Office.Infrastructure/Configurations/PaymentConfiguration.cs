using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class PaymentConfiguration : IEntityTypeConfiguration<Payment> {
    public void Configure(EntityTypeBuilder<Payment> builder) {
      builder.ToTable("payments");
      builder.HasKey(p => p.Id);
      builder.Property(p => p.Amount).HasColumnType("decimal(18,2)").IsRequired();
      builder.Property(p => p.Status).HasMaxLength(50);
      builder.Property(p => p.InvoiceNumber).HasMaxLength(100);
      builder.Property(p => p.PaymentMethod).HasMaxLength(50);
      builder.Property(p => p.CreatedAt).IsRequired();
      
      // Foreign key relationships
      builder.HasOne<LegalRequest>()
        .WithMany()
        .HasForeignKey(p => p.RequestId)
        .OnDelete(DeleteBehavior.SetNull);
        
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(p => p.ClientId)
        .OnDelete(DeleteBehavior.SetNull);
    }
  }
}
