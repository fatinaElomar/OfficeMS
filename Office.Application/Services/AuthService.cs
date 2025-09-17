using System.Threading.Tasks;
using Office.Data.DTOs;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Office.Application.Helpers;
using System.Security.Cryptography;
using System.Text;

namespace Office.Application.Services {
  public class AuthService {
    private readonly IUserRepository _users;
    private readonly JwtTokenGenerator _jwt;
    public AuthService(IUserRepository users, JwtTokenGenerator jwt) {
      _users = users;
      _jwt = jwt;
    }

    public async Task<User> RegisterAsync(RegisterDto dto) {
      var existing = await _users.GetByEmailAsync(dto.Email);
      if (existing != null) return null;
      var user = new User {
        Name = dto.Name,
        Email = dto.Email,
        Password = HashPassword(dto.Password),
        Phone = dto.Phone,
        Role = dto.Role,
        Status = "active"
      };
      await _users.AddAsync(user);
      return user;
    }

    public async Task<string> LoginAsync(string email, string password) {
      var user = await _users.GetByEmailAsync(email);
      if (user == null) return null;
      if (!VerifyPassword(password, user.Password)) return null;
      return _jwt.GenerateToken(user);
    }

    private string HashPassword(string password) {
      using var sha = SHA256.Create();
      var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
      return Convert.ToBase64String(bytes);
    }
    private bool VerifyPassword(string password, string hashed) {
      return HashPassword(password) == hashed;
    }
  }
}
