using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Office.Infrastructure.Data;

namespace Office.Infrastructure.Repositories {
  public class UserRepository : GenericRepository<User>, IUserRepository {
    private readonly ApplicationDbContext _app;
    public UserRepository(ApplicationDbContext context) : base(context) {
      _app = context;
    }
    public async Task<User> GetByEmailAsync(string email) {
      return await _app.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
  }
}
