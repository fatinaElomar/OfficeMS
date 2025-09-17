using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;

namespace Office.Application.Helpers {
  public class EmailSender {
    private readonly string _from;
    private readonly string _host;
    private readonly int _port;
    private readonly string _username;
    private readonly string _password;
    private readonly bool _enableSsl;

    public EmailSender(string from, string host, int port, string username, string password, bool enableSsl) {
      _from = from;
      _host = host;
      _port = port;
      _username = username;
      _password = password;
      _enableSsl = enableSsl;
    }

    public async Task SendAsync(string to, string subject, string body) {
      using var message = new MailMessage();
      message.From = new MailAddress(_from);
      message.To.Add(new MailAddress(to));
      message.Subject = subject;
      message.Body = body;
      message.IsBodyHtml = false;

      using var client = new SmtpClient(_host, _port) {
        EnableSsl = _enableSsl,
        Credentials = new NetworkCredential(_username, _password),
        DeliveryMethod = SmtpDeliveryMethod.Network
      };

      await client.SendMailAsync(message);
    }
  }
}
