using Microsoft.AspNetCore.Mvc;
namespace Payment.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class PaymentProcessingController : ControllerBase {
    [HttpGet("ping")]
    public IActionResult Ping() => Ok(new { message = "Payment API OK" });
  }
}
