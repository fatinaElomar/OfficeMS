namespace Office.Data.DTOs {
  public class LegalRequestDto {
    public long ClientId { get; set; }
    public long? LawyerId { get; set; }
    public long? OfficeId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
  }

  public class AssignRequestDto {
    public long? LawyerId { get; set; }
    public long? OfficeId { get; set; }
  }
}
