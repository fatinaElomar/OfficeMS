using System.Threading.Tasks;
using Office.Data.Entities;

namespace Office.Data.Interfaces {
  public interface IPaymentRepository : IGenericRepository<Payment> {
    Task<Payment> GetByInvoiceAsync(string invoiceNumber);
  }
}
