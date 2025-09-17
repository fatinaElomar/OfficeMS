using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Office.Application.Services;
using Office.Data.Entities;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class ChatController : ControllerBase {
    private readonly ChatService _chat;
    public ChatController(ChatService chat) { _chat = chat; }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] AlChat chat) {
      var c = await _chat.AddMessageAsync(chat);
      return Ok(c);
    }
  }
}
