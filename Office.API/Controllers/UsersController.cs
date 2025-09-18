using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Office.Application.Services;
using Office.Data.DTOs;
using Office.Data.Entities;
using Office.Data.Interfaces;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase {
  private readonly IUserRepository _users;
  private readonly AuthService _auth;
  public UsersController(IUserRepository users, AuthService auth) { _users = users; _auth = auth; }


  [HttpGet]
  public async Task<ActionResult<IEnumerable<User>>> GetAll() {
    var users = await _users.GetAllAsync();
    return Ok(users);
  }

  [HttpGet("{id:long}")]
  public async Task<ActionResult<User>> GetById(long id) {
    var user = await _users.GetByIdAsync(id);
    if (user == null) return NotFound();
    return Ok(user);
  }

  // Auth endpoints consolidated here
  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterDto dto) {
    var user = await _auth.RegisterAsync(dto);
    if (user == null) return Conflict(new { message = "Email already exists" });
    return Ok(new { message = "Registration successful. Check your email to verify your account." });
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginDto dto) {
    var token = await _auth.LoginAsync(dto.Email, dto.Password);
    if (token == null) return Unauthorized(new { message = "Invalid credentials or email not verified" });
    return Ok(new { token });
  }

  [HttpGet("verify")] // /api/users/verify?token=...
  public async Task<IActionResult> Verify([FromQuery] string token) {
    var ok = await _auth.VerifyEmailAsync(token);
    if (!ok) return BadRequest(new { message = "Invalid or expired token" });
    return Ok(new { message = "Email verified successfully" });
  }

  [HttpPost("resend")] // body: { email }
  public async Task<IActionResult> Resend([FromBody] LoginDto dto) {
    var ok = await _auth.ResendVerificationEmailAsync(dto.Email);
    if (!ok) return NotFound(new { message = "User not found" });
    return Ok(new { message = "Verification email sent" });
  }

  [HttpGet("dev/token")] // dev helper: /api/users/dev/token?email=...
  public async Task<IActionResult> GetToken([FromQuery] string email) {
    var token = await _auth.GetVerificationTokenForDevAsync(email);
    if (string.IsNullOrEmpty(token)) return NotFound();
    return Ok(new { token, verifyUrl = $"http://localhost:5125/api/Users/verify?token={token}" });
  }

  [HttpPut("{id:long}")]
  public async Task<IActionResult> Update(long id, [FromBody] UpdateUserDto dto) {
    var existing = await _users.GetByIdAsync(id);
    if (existing == null) return NotFound();

    if (dto.Name != null) existing.Name = dto.Name;
    if (dto.Phone != null) existing.Phone = dto.Phone;
    if (dto.Role != null) existing.Role = dto.Role;
    if (dto.Status != null) existing.Status = dto.Status;

    await _users.UpdateAsync(existing);
    return NoContent();
  }

  [HttpDelete("{id:long}")]
  public async Task<IActionResult> Delete(long id) {
    var existing = await _users.GetByIdAsync(id);
    if (existing == null) return NotFound();
    await _users.DeleteAsync(id);
    return NoContent();
  }
  }
}
