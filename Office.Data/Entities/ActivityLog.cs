using System;

namespace Office.Data.Entities {
  public class ActivityLog : BaseEntity {
    public long? UserId { get; set; }
    public string Action { get; set; }
    public string Details { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}
