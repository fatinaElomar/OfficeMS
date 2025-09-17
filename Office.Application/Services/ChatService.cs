using System.Threading.Tasks;
using Office.Data.Entities;
using Office.Data.Interfaces;

namespace Office.Application.Services {
  public class ChatService : IChatService {
    private readonly Office.Infrastructure.Repositories.ChatRepository _chatRepo;
    public ChatService(Office.Infrastructure.Repositories.ChatRepository chatRepo) { _chatRepo = chatRepo; }
    public async Task<AlChat> AddMessageAsync(AlChat chat) {
      chat.CreatedAt = System.DateTime.UtcNow;
      return await _chatRepo.AddMessageAsync(chat);
    }
  }
}
