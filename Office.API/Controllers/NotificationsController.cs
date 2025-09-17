using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Application.Services;
using Office.Data.Entities;
using System.Linq;

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

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> ByUser(long userId) {
      var list = await _notifications.GetByUserAsync(userId);
      return Ok(list);
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkRead(long id) {
      await _notifications.MarkReadAsync(id);
      return NoContent();
    }
  }
}
