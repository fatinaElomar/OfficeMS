using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Application.Services;
using Office.Data.Entities;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class NotificationsController : ControllerBase {
    private readonly NotificationService _notifications;
    public NotificationsController(NotificationService notifications) { _notifications = notifications; }

    [HttpPost]
    public async Task<IActionResult> Send([FromBody] Notification n) {
      var created = await _notifications.SendAsync(n);
      return Ok(created);
    }
  }
}
