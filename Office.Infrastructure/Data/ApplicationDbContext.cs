using Microsoft.EntityFrameworkCore;
using Office.Data.Entities;
using Office.Infrastructure.Configurations;

namespace Office.Infrastructure.Data {
  public class ApplicationDbContext : DbContext {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<ClientProfile> ClientProfiles { get; set; }
    public DbSet<LawyerProfile> LawyerProfiles { get; set; }
    public DbSet<OfficeEntity> Offices { get; set; }
    public DbSet<LegalRequest> LegalRequests { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<RequestFile> RequestFiles { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<ActivityLog> ActivityLogs { get; set; }
    public DbSet<AlChat> AlChats { get; set; }
    public DbSet<Commission> Commissions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      modelBuilder.ApplyConfiguration(new UserConfiguration());
      modelBuilder.ApplyConfiguration(new ClientProfileConfiguration());
      modelBuilder.ApplyConfiguration(new LawyerProfileConfiguration());
      modelBuilder.ApplyConfiguration(new OfficeEntityConfiguration());
      modelBuilder.ApplyConfiguration(new LegalRequestConfiguration());
      modelBuilder.ApplyConfiguration(new PaymentConfiguration());
      modelBuilder.ApplyConfiguration(new RequestFileConfiguration());
      modelBuilder.ApplyConfiguration(new NotificationConfiguration());
      modelBuilder.ApplyConfiguration(new ActivityLogConfiguration());
      modelBuilder.ApplyConfiguration(new AlChatConfiguration());
      modelBuilder.ApplyConfiguration(new CommissionConfiguration());
    }
  }
}
