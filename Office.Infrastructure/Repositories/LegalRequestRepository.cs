using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Office.Infrastructure.Data;

namespace Office.Infrastructure.Repositories {
  public class LegalRequestRepository : GenericRepository<LegalRequest>, ILegalRequestRepository {
    private readonly ApplicationDbContext _app;
    public LegalRequestRepository(ApplicationDbContext ctx) : base(ctx) { _app = ctx; }
    public async Task<IEnumerable<LegalRequest>> GetByClientIdAsync(long clientId) {
      return await _app.LegalRequests.Where(r => r.ClientId == clientId).ToListAsync();
    }
  }
}
