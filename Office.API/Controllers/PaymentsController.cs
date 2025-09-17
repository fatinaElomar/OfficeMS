using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Application.Services;
using Office.Data.Entities;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class PaymentsController : ControllerBase {
    private readonly PaymentService _payments;
    public PaymentsController(PaymentService payments) { _payments = payments; }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Payment p) {
      var created = await _payments.CreatePaymentAsync(p);
      return Ok(created);
    }

    [HttpGet("invoice/{invoice}")]
    public async Task<IActionResult> ByInvoice(string invoice) {
      var p = await _payments.GetByInvoiceAsync(invoice);
      if (p == null) return NotFound();
      return Ok(p);
    }
  }
}
