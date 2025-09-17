using System.Collections.Generic;
using System.Threading.Tasks;
using Office.Data.Entities;

namespace Office.Data.Interfaces {
  public interface INotificationRepository : IGenericRepository<Notification> {
    Task<IEnumerable<Notification>> GetByUserIdAsync(long userId);
  }
}
