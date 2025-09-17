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
  private readonly AuthService _auth;
  private readonly IUserRepository _users;
  public UsersController(AuthService auth, IUserRepository users) { _auth = auth; _users = users; }

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
