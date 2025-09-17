using System;
using System.Threading.Tasks;
using Office.Data.Entities;
using Office.Data.Interfaces;

namespace Office.Application.Services {
  public class NotificationService {
    private readonly INotificationRepository _notifications;
    public NotificationService(INotificationRepository notifications) { _notifications = notifications; }

    public async Task<Notification> SendAsync(Notification n) {
      n.CreatedAt = DateTime.UtcNow;
      n.IsRead = false;
      return await _notifications.AddAsync(n);
    }
  }
}
