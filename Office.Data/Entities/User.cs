using System;
namespace Office.Data.Entities {
  public class User : BaseEntity {
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsEmailVerified { get; set; }
    public string EmailVerificationToken { get; set; }
    public DateTime? EmailVerifiedAt { get; set; }
    public DateTime? EmailVerificationSentAt { get; set; }
  }
}
