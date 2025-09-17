using System.Threading.Tasks;
using Office.Data.DTOs;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Office.Application.Helpers;
using System.Security.Cryptography;
using System.Text;
using System;

namespace Office.Application.Services {
  public class AuthService {
    private readonly IUserRepository _users;
    private readonly JwtTokenGenerator _jwt;
    private readonly EmailSender _emailSender;
    private readonly string _verificationBaseUrl;
    public AuthService(IUserRepository users, JwtTokenGenerator jwt, EmailSender emailSender) {
      _users = users;
      _jwt = jwt;
      _emailSender = emailSender;
      _verificationBaseUrl = Environment.GetEnvironmentVariable("VERIFICATION_BASE_URL") ?? "https://example.com/verify-email";
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
        Status = "pending",
        IsEmailVerified = false,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
      };
      user.EmailVerificationToken = GenerateVerificationToken();
      user.EmailVerificationSentAt = DateTime.UtcNow;
      await _users.AddAsync(user);
      await SendVerificationEmailAsync(user);
      return user;
    }

    public async Task<string> LoginAsync(string email, string password) {
      var user = await _users.GetByEmailAsync(email);
      if (user == null) return null;
      if (!VerifyPassword(password, user.Password)) return null;
      if (!user.IsEmailVerified) return null;
      return _jwt.GenerateToken(user);
    }

    public async Task<bool> VerifyEmailAsync(string token) {
      if (string.IsNullOrWhiteSpace(token)) return false;
      var user = await _users.GetByVerificationTokenAsync(token);
      if (user == null) return false;
      user.IsEmailVerified = true;
      user.EmailVerifiedAt = DateTime.UtcNow;
      user.EmailVerificationToken = string.Empty;
      user.Status = "active";
      user.UpdatedAt = DateTime.UtcNow;
      await _users.UpdateAsync(user);
      return true;
    }

    public async Task<bool> ResendVerificationEmailAsync(string email) {
      var user = await _users.GetByEmailAsync(email);
      if (user == null) return false;
      if (user.IsEmailVerified) return true; // already verified
      if (string.IsNullOrWhiteSpace(user.EmailVerificationToken)) {
        user.EmailVerificationToken = GenerateVerificationToken();
      }
      user.EmailVerificationSentAt = DateTime.UtcNow;
      user.UpdatedAt = DateTime.UtcNow;
      await _users.UpdateAsync(user);
      await SendVerificationEmailAsync(user);
      return true;
    }

    public async Task<string> GetVerificationTokenForDevAsync(string email) {
      var user = await _users.GetByEmailAsync(email);
      return user?.EmailVerificationToken ?? string.Empty;
    }

    private string HashPassword(string password) {
      using var sha = SHA256.Create();
      var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
      return Convert.ToBase64String(bytes);
    }
    private bool VerifyPassword(string password, string hashed) {
      return HashPassword(password) == hashed;
    }

    private string GenerateVerificationToken() {
      var bytes = new byte[32];
      RandomNumberGenerator.Fill(bytes);
      return Convert.ToBase64String(bytes)
        .Replace("+", "-")
        .Replace("/", "_")
        .TrimEnd('=');
    }

    private async Task SendVerificationEmailAsync(User user) {
      var link = $"{_verificationBaseUrl}?token={user.EmailVerificationToken}";
      var subject = "Verify your email";
      var body = $"Hello {user.Name},\n\nPlease verify your email by clicking the link: {link}\n\nIf you did not sign up, ignore this email.";
      await _emailSender.SendAsync(user.Email, subject, body);
    }
  }
}
