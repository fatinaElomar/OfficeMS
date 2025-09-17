using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class AlChatConfiguration : IEntityTypeConfiguration<AlChat> {
    public void Configure(EntityTypeBuilder<AlChat> builder) {
      builder.ToTable("al_chats");
      builder.HasKey(ac => ac.Id);
      builder.Property(ac => ac.Message).HasMaxLength(2000);
      builder.Property(ac => ac.Role).HasMaxLength(50);
      builder.Property(ac => ac.CreatedAt).IsRequired();
      
      // Foreign key relationships
      builder.HasOne<LegalRequest>()
        .WithMany()
        .HasForeignKey(ac => ac.RequestId)
        .OnDelete(DeleteBehavior.NoAction);
        
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(ac => ac.UserId)
        .OnDelete(DeleteBehavior.SetNull);
    }
  }
}
