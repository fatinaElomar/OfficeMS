using System;

namespace Office.Data.Entities {
  public class Commission : BaseEntity {
    public long? OfficeId { get; set; }
    public long? LawyerId { get; set; }
    public long? RequestId { get; set; }
    public decimal CommissionPercentage { get; set; }
    public decimal CommissionAmount { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}
