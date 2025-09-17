using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Application.Services;
using Office.Data.DTOs;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase {
    private readonly AuthService _auth;
    public UsersController(AuthService auth) { _auth = auth; }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto) {
      var user = await _auth.RegisterAsync(dto);
      if (user == null) return BadRequest(new { message = "User exists" });
      return Ok(user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto) {
      var token = await _auth.LoginAsync(dto.Email, dto.Password);
      if (token == null) return Unauthorized();
      return Ok(new { token });
    }
  }
}
