namespace Office.Data.Entities {
  public class LegalRequest : BaseEntity {
    public long ClientId { get; set; }
    public long? LawyerId { get; set; }
    public long? OfficeId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
  }
}
