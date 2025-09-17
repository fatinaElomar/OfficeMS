using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Office.Data.Entities;

namespace Office.Infrastructure.Configurations {
  public class RequestFileConfiguration : IEntityTypeConfiguration<RequestFile> {
    public void Configure(EntityTypeBuilder<RequestFile> builder) {
      builder.ToTable("request_files");
      builder.HasKey(rf => rf.Id);
      builder.Property(rf => rf.RequestId).IsRequired();
      builder.Property(rf => rf.UploadedBy).IsRequired();
      builder.Property(rf => rf.FilePath).HasMaxLength(500).IsRequired();
      builder.Property(rf => rf.FileType).HasMaxLength(100);
      builder.Property(rf => rf.CreatedAt).IsRequired();
      
      // Foreign key relationships
      builder.HasOne<LegalRequest>()
        .WithMany()
        .HasForeignKey(rf => rf.RequestId)
        .OnDelete(DeleteBehavior.NoAction);
        
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(rf => rf.UploadedBy)
        .OnDelete(DeleteBehavior.Restrict);
    }
  }
}
