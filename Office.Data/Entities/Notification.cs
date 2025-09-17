using System;

namespace Office.Data.Entities {
  public class Notification : BaseEntity {
    public long? UserId { get; set; }
    public string Type { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}
