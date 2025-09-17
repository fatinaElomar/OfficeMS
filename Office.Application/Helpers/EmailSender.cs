using System.Threading.Tasks;

namespace Office.Application.Helpers {
  public class EmailSender {
    private readonly string _from;
    public EmailSender(string from) { _from = from; }
    public Task SendAsync(string to, string subject, string body) {
      // Placeholder: integrate SMTP or external provider.
      System.Console.WriteLine($"[EmailSender] To={to} Subject={subject}");
      return Task.CompletedTask;
    }
  }
}
