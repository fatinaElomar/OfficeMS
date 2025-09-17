using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Data.DTOs;
using Office.Data.Interfaces;
using Office.Data.Entities;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class LegalRequestsController : ControllerBase {
    private readonly ILegalRequestRepository _requests;
    public LegalRequestsController(ILegalRequestRepository requests) { _requests = requests; }

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
  }
}
