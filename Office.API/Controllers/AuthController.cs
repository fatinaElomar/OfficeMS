using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Application.Services;
using Office.Data.DTOs;
namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase {
    private readonly AuthService _auth;
    public AuthController(AuthService auth) { _auth = auth; }

    [HttpGet("ping")]
    public IActionResult Ping() => Ok(new { message = "Auth API OK" });

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto) {
      var user = await _auth.RegisterAsync(dto);
      if (user == null) return Conflict(new { message = "Email already exists" });
      return Ok(new { message = "Registration successful. Check your email to verify your account." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request) {
      var token = await _auth.LoginAsync(request.Email, request.Password);
      if (token == null) return Unauthorized(new { message = "Invalid credentials or email not verified" });
      return Ok(new { token });
    }

    [HttpGet("verify")]
    public async Task<IActionResult> Verify([FromQuery] string token) {
      var ok = await _auth.VerifyEmailAsync(token);
      if (!ok) return BadRequest(new { message = "Invalid or expired token" });
      return Ok(new { message = "Email verified successfully" });
    }

    [HttpPost("resend")] // body: { email }
    public async Task<IActionResult> Resend([FromBody] LoginRequest request) {
      var ok = await _auth.ResendVerificationEmailAsync(request.Email);
      if (!ok) return NotFound(new { message = "User not found" });
      return Ok(new { message = "Verification email sent" });
    }

    [HttpGet("dev/token")] // dev helper: /api/auth/dev/token?email=...
    public async Task<IActionResult> GetToken([FromQuery] string email) {
      var token = await _auth.GetVerificationTokenForDevAsync(email);
      if (string.IsNullOrEmpty(token)) return NotFound();
      return Ok(new { token, verifyUrl = $"http://localhost:5125/api/auth/verify?token={token}" });
    }
  }
}

namespace Office.Data.DTOs {
  public class LoginRequest {
    public string Email { get; set; }
    public string Password { get; set; }
  }
}
