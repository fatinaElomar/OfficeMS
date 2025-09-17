using System.Threading.Tasks;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Office.Infrastructure.Data;

namespace Office.Infrastructure.Repositories {
  public class ChatRepository : GenericRepository<AlChat> {
    private readonly ApplicationDbContext _app;
    public ChatRepository(ApplicationDbContext ctx) : base(ctx) { _app = ctx; }
    public async Task<AlChat> AddMessageAsync(AlChat chat) {
      await _app.AlChats.AddAsync(chat);
      await _app.SaveChangesAsync();
      return chat;
    }
  }
}
