using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Office.Infrastructure.Data;

namespace Office.Infrastructure.Repositories {
  public class NotificationRepository : GenericRepository<Notification>, INotificationRepository {
    private readonly ApplicationDbContext _app;
    public NotificationRepository(ApplicationDbContext ctx) : base(ctx) { _app = ctx; }
    public async Task<IEnumerable<Notification>> GetByUserIdAsync(long userId) {
      return await _app.Notifications.Where(n => n.UserId == userId).ToListAsync();
    }
  }
}
