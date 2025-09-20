using System.Threading.Tasks;
using System.Collections.Generic;
using Office.Data.Entities;

namespace Office.Data.Interfaces {
  public interface IChatService {
    Task<AlChat> AddMessageAsync(AlChat chat);
    Task<List<AlChat>> GetMessagesByRequestIdAsync(long requestId);
    Task<List<AlChat>> GetMessagesByUserIdAsync(long userId);
    Task<AlChat> GetAiResponseAsync(AlChat userMessage);
  }
}
