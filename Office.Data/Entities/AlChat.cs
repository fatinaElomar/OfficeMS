using System;

namespace Office.Data.Entities {
  public class AlChat : BaseEntity {
    public long? RequestId { get; set; }
    public long? UserId { get; set; }
    public string Message { get; set; }
    public string Role { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}
