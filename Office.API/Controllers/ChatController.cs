using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Office.Application.Services;
using Office.Data.Entities;
using Office.Data.Interfaces;

namespace Office.API.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class ChatController : ControllerBase {
    private readonly ChatService _chat;
    private readonly IGenericRepository<AlChat> _chatRepo;
    
    public ChatController(ChatService chat, IGenericRepository<AlChat> chatRepo) { 
      _chat = chat; 
      _chatRepo = chatRepo;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] AlChat chat) {
      var c = await _chat.AddMessageAsync(chat);
      return Ok(c);
    }

    [HttpGet("request/{requestId}")]
    public async Task<IActionResult> GetByRequestId(long requestId) {
      var messages = await _chat.GetMessagesByRequestIdAsync(requestId);
      return Ok(messages);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(long userId) {
      var messages = await _chat.GetMessagesByUserIdAsync(userId);
      return Ok(messages);
    }

    [HttpPost("ai-response")]
    public async Task<IActionResult> GetAiResponse([FromBody] AlChat userMessage) {
      var aiResponse = await _chat.GetAiResponseAsync(userMessage);
      return Ok(aiResponse);
    }
  }
}
