using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class ClientProfileConfiguration : IEntityTypeConfiguration<ClientProfile> {
    public void Configure(EntityTypeBuilder<ClientProfile> builder) {
      builder.ToTable("client_profiles");
      builder.HasKey(cp => cp.Id);
      builder.Property(cp => cp.UserId).IsRequired();
      builder.Property(cp => cp.Address).HasMaxLength(500);
      builder.Property(cp => cp.NationalId).HasMaxLength(50);
      
      // Foreign key relationship
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(cp => cp.UserId)
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}
