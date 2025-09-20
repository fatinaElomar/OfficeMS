using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Office.Data.Entities;
using Office.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Office.Application.Services {
  public class ChatService : IChatService {
    private readonly Office.Infrastructure.Repositories.ChatRepository _chatRepo;
    private readonly IGenericRepository<AlChat> _chatRepository;
    
    public ChatService(Office.Infrastructure.Repositories.ChatRepository chatRepo, IGenericRepository<AlChat> chatRepository) { 
      _chatRepo = chatRepo; 
      _chatRepository = chatRepository;
    }
    
    public async Task<AlChat> AddMessageAsync(AlChat chat) {
      chat.CreatedAt = System.DateTime.UtcNow;
      return await _chatRepo.AddMessageAsync(chat);
    }

    public async Task<List<AlChat>> GetMessagesByRequestIdAsync(long requestId) {
      var allMessages = await _chatRepository.GetAllAsync();
      return allMessages
        .Where(c => c.RequestId == requestId)
        .OrderBy(c => c.CreatedAt)
        .ToList();
    }

    public async Task<List<AlChat>> GetMessagesByUserIdAsync(long userId) {
      var allMessages = await _chatRepository.GetAllAsync();
      return allMessages
        .Where(c => c.UserId == userId)
        .OrderBy(c => c.CreatedAt)
        .ToList();
    }

    public async Task<AlChat> GetAiResponseAsync(AlChat userMessage) {
      // Save user message first
      userMessage.CreatedAt = System.DateTime.UtcNow;
      var savedUserMessage = await _chatRepo.AddMessageAsync(userMessage);

      // Generate AI response
      var aiResponse = new AlChat {
        RequestId = userMessage.RequestId,
        UserId = userMessage.UserId,
        Message = GenerateAiResponse(userMessage.Message),
        Role = "assistant",
        CreatedAt = System.DateTime.UtcNow
      };

      // Save AI response
      var savedAiResponse = await _chatRepo.AddMessageAsync(aiResponse);
      
      return savedAiResponse;
    }

    private string GenerateAiResponse(string userMessage) {
      // Simple AI response logic - in a real application, this would integrate with an AI service
      var responses = new Dictionary<string, string> {
        ["hello"] = "Hello! I'm your AI legal assistant. How can I help you with your legal matter today?",
        ["help"] = "I can help you with legal questions, document preparation, case status updates, and general legal guidance. What specific area do you need assistance with?",
        ["status"] = "I can check the status of your legal requests. Please provide your request ID or describe the matter you're inquiring about.",
        ["document"] = "I can help you understand legal documents, prepare forms, or guide you through document requirements. What type of document do you need help with?",
        ["payment"] = "I can assist you with payment-related questions, invoice inquiries, or billing information. What payment matter can I help you with?",
        ["contact"] = "I can help you get in touch with your assigned lawyer or legal team. Would you like me to send a message to your legal representative?",
        ["urgent"] = "I understand this is urgent. I'll prioritize your request and ensure it gets immediate attention from our legal team.",
        ["thank"] = "You're welcome! I'm here to help with any other legal questions or concerns you may have.",
        ["bye"] = "Goodbye! Feel free to reach out anytime if you need further legal assistance. Have a great day!"
      };

      var lowerMessage = userMessage.ToLower();
      
      // Check for keyword matches
      foreach (var kvp in responses) {
        if (lowerMessage.Contains(kvp.Key)) {
          return kvp.Value;
        }
      }

      // Default responses based on message content
      if (lowerMessage.Contains("legal") || lowerMessage.Contains("law")) {
        return "I understand you have a legal question. I'm here to provide guidance and assistance. Could you please provide more details about your specific legal matter?";
      }
      
      if (lowerMessage.Contains("case") || lowerMessage.Contains("matter")) {
        return "I can help you with information about your case or legal matter. Please provide your case reference number or describe the issue you're facing.";
      }
      
      if (lowerMessage.Contains("time") || lowerMessage.Contains("when")) {
        return "I can help you with timing-related questions about your legal matter. Processing times vary depending on the complexity of the case. Would you like me to check the status of a specific request?";
      }

      // Generic helpful response
      return "Thank you for your message. I'm an AI legal assistant designed to help with various legal matters. I can assist with case status, document preparation, legal guidance, and connecting you with the right legal professionals. How can I be of service today?";
    }
  }
}
