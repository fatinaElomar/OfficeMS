namespace Office.Data.Entities {
  public class LawyerProfile : BaseEntity {
    public long UserId { get; set; }
    public string Specialization { get; set; }
    public string LicenseNumber { get; set; }
    public int ExperienceYears { get; set; }
    public long? OfficeId { get; set; }
  }
}
