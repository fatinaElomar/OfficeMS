using Microsoft.AspNetCore.Mvc;
namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase {
    [HttpGet("ping")]
    public IActionResult Ping() => Ok(new { message = "Moved: use /api/Users endpoints" });
  }
}
