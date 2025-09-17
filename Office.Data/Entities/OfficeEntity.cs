namespace Office.Data.Entities {
  public class OfficeEntity : BaseEntity {
    public long UserId { get; set; }
    public string OfficeName { get; set; }
    public string Address { get; set; }
    public string QrCode { get; set; }
  }
}
