using System;

namespace Office.Data.Entities {
  public class Payment : BaseEntity {
    public long? RequestId { get; set; }
    public long? ClientId { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; }
    public string InvoiceNumber { get; set; }
    public string PaymentMethod { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}
