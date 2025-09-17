using System.Collections.Generic;
using System.Threading.Tasks;
using Office.Data.Entities;

namespace Office.Data.Interfaces {
  public interface ILegalRequestRepository : IGenericRepository<LegalRequest> {
    Task<IEnumerable<LegalRequest>> GetByClientIdAsync(long clientId);
  }
}
