using System;

namespace Office.Data.Entities {
  public class ClientProfile : BaseEntity {
    public long UserId { get; set; }
    public string Address { get; set; }
    public string NationalId { get; set; }
    public DateTime? DateOfBirth { get; set; }
  }
}
