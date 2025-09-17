using System;
using System.Threading.Tasks;
using Office.Data.Entities;
using Office.Data.Interfaces;

namespace Office.Application.Services {
  public class PaymentService {
    private readonly IPaymentRepository _payments;
    public PaymentService(IPaymentRepository payments) { _payments = payments; }

    public async Task<Payment> CreatePaymentAsync(Payment payment) {
      payment.CreatedAt = DateTime.UtcNow;
      payment.Status = payment.Status ?? "pending";
      return await _payments.AddAsync(payment);
    }

    public async Task<Payment> GetByInvoiceAsync(string invoice) {
      return await _payments.GetByInvoiceAsync(invoice);
    }
  }
}
