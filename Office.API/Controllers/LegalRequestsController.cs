using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Data.DTOs;
using Office.Data.Interfaces;
using Office.Data.Entities;
using Office.Data.Enums;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class LegalRequestsController : ControllerBase {
    private readonly ILegalRequestRepository _requests;
    private readonly IGenericRepository<Commission> _commissions;
    private readonly IGenericRepository<Notification> _notifications;
    public LegalRequestsController(
      ILegalRequestRepository requests,
      IGenericRepository<Commission> commissions,
      IGenericRepository<Notification> notifications
    ) {
      _requests = requests;
      _commissions = commissions;
      _notifications = notifications;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] LegalRequestDto dto) {
      var req = new LegalRequest {
        ClientId = dto.ClientId,
        LawyerId = dto.LawyerId,
        OfficeId = dto.OfficeId,
        Title = dto.Title,
        Description = dto.Description,
        Status = "new"
      };
      await _requests.AddAsync(req);
      return Ok(req);
    }

    [HttpGet("client/{clientId}")]
    public async Task<IActionResult> ByClient(long clientId) {
      var list = await _requests.GetByClientIdAsync(clientId);
      return Ok(list);
    }

    [HttpPut("{id}/assign")]
    public async Task<IActionResult> Assign(long id, [FromBody] AssignRequestDto dto) {
      var req = await _requests.GetByIdAsync(id);
      if (req == null) return NotFound();
      req.LawyerId = dto.LawyerId;
      req.OfficeId = dto.OfficeId;
      await _requests.UpdateAsync(req);
      return Ok(req);
    }

    [HttpPut("{id}/start")]
    public async Task<IActionResult> Start(long id) {
      var req = await _requests.GetByIdAsync(id);
      if (req == null) return NotFound();
      req.Status = RequestStatus.InProgress;
      await _requests.UpdateAsync(req);
      await _notifications.AddAsync(new Notification {
        UserId = req.ClientId,
        Type = "status",
        Title = "Request started",
        Message = $"Your request '{req.Title}' is now in progress"
      });
      return Ok(req);
    }

    [HttpPut("{id}/complete")]
    public async Task<IActionResult> Complete(long id) {
      var req = await _requests.GetByIdAsync(id);
      if (req == null) return NotFound();
      req.Status = RequestStatus.Completed;
      await _requests.UpdateAsync(req);

      // Basic commission rule: 10% to office if OfficeId present
      if (req.OfficeId.HasValue) {
        var commission = new Commission {
          OfficeId = req.OfficeId,
          LawyerId = req.LawyerId,
          RequestId = req.Id,
          CommissionPercentage = 10m,
          CommissionAmount = 0m // amount can be updated when payment is known
        };
        await _commissions.AddAsync(commission);
      }

      await _notifications.AddAsync(new Notification {
        UserId = req.ClientId,
        Type = "status",
        Title = "Request completed",
        Message = $"Your request '{req.Title}' has been completed"
      });

      return Ok(req);
    }
  }
}
