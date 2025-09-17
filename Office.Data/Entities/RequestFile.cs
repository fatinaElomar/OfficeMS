using System;

namespace Office.Data.Entities {
  public class RequestFile : BaseEntity {
    public long RequestId { get; set; }
    public long UploadedBy { get; set; }
    public string FilePath { get; set; }
    public string FileType { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}
