using System.Threading.Tasks;
using Office.Data.Entities;

namespace Office.Data.Interfaces {
  public interface IChatService {
    Task<AlChat> AddMessageAsync(AlChat chat);
  }
}
