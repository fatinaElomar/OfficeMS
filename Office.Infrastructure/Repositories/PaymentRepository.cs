using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Office.Infrastructure.Data;

namespace Office.Infrastructure.Repositories {
  public class PaymentRepository : GenericRepository<Payment>, IPaymentRepository {
    private readonly ApplicationDbContext _app;
    public PaymentRepository(ApplicationDbContext ctx) : base(ctx) { _app = ctx; }
    public async Task<Payment> GetByInvoiceAsync(string invoiceNumber) {
      return await _app.Payments.FirstOrDefaultAsync(p => p.InvoiceNumber == invoiceNumber);
    }
  }
}
