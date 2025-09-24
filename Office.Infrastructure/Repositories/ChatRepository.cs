using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Office.Data.Entities;
using Office.Infrastructure.Data;

namespace Office.Infrastructure.Repositories
{
    // Make sure this is public
    public class ChatRepository : GenericRepository<AlChat>
    {
        private readonly ApplicationDbContext _app;

        public ChatRepository(ApplicationDbContext ctx) : base(ctx)
        {
            _app = ctx;
        }

        // Adds a chat message and returns it
        public async Task<AlChat> AddMessageAsync(AlChat chat)
        {
            if (chat == null)
                throw new ArgumentNullException(nameof(chat));

            await _app.AlChats.AddAsync(chat);
            await _app.SaveChangesAsync();
            return chat;
        }

        // Optional: get a chat by ID safely
        public async Task<AlChat?> GetByIdAsync(int id)
        {
            return await _app.AlChats.FindAsync(id);
        }
    }
}
