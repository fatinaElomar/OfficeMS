using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class LawyerProfileConfiguration : IEntityTypeConfiguration<LawyerProfile> {
    public void Configure(EntityTypeBuilder<LawyerProfile> builder) {
      builder.ToTable("lawyer_profiles");
      builder.HasKey(lp => lp.Id);
      builder.Property(lp => lp.UserId).IsRequired();
      builder.Property(lp => lp.Specialization).HasMaxLength(200);
      builder.Property(lp => lp.LicenseNumber).HasMaxLength(100);
      builder.Property(lp => lp.ExperienceYears).IsRequired();
      
      // Foreign key relationships
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(lp => lp.UserId)
        .OnDelete(DeleteBehavior.NoAction);
        
      builder.HasOne<OfficeEntity>()
        .WithMany()
        .HasForeignKey(lp => lp.OfficeId)
        .OnDelete(DeleteBehavior.SetNull);
    }
  }
}
