using System.Threading.Tasks;
using Office.Data.Entities;

namespace Office.Data.Interfaces {
  public interface IUserRepository : IGenericRepository<User> {
    Task<User> GetByEmailAsync(string email);
    Task<User> GetByVerificationTokenAsync(string token);
  }
}
