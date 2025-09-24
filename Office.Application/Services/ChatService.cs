using Office.Infrastructure.Repositories;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Office.Data.Entities;
using Office.Data.Interfaces;

namespace Office.Application.Services
{
    public class ChatService : IChatService
    {
        private readonly ChatRepository _chatRepo;
        private readonly IGenericRepository<AlChat> _chatRepository;
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

    public ChatService(ChatRepository chatRepo, IGenericRepository<AlChat> chatRepository)
    {
      _chatRepo = chatRepo;
      _chatRepository = chatRepository;
      _httpClient = new HttpClient();
      _apiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY")
                ?? throw new InvalidOperationException("OPENROUTER_API_KEY not set.");
                      Console.WriteLine($"OPENROUTER_API_KEY: {_apiKey}");
        }

        public async Task<AlChat> AddMessageAsync(AlChat chat)
        {
            chat.CreatedAt = System.DateTime.UtcNow;
            return await _chatRepo.AddMessageAsync(chat);
        }

        public async Task<List<AlChat>> GetMessagesByRequestIdAsync(long requestId)
        {
            var allMessages = await _chatRepository.GetAllAsync();
            return allMessages
                .Where(c => c.RequestId == requestId)
                .OrderBy(c => c.CreatedAt)
                .ToList();
        }

        public async Task<List<AlChat>> GetMessagesByUserIdAsync(long userId)
        {
            var allMessages = await _chatRepository.GetAllAsync();
            return allMessages
                .Where(c => c.UserId == userId)
                .OrderBy(c => c.CreatedAt)
                .ToList();
        }

        public async Task<AlChat> GetAiResponseAsync(AlChat userMessage)
        {
            // Save user message
            userMessage.CreatedAt = System.DateTime.UtcNow;
            await _chatRepo.AddMessageAsync(userMessage);

            // Call AI service
            var aiResponse = new AlChat
            {
                RequestId = userMessage.RequestId,
                UserId = userMessage.UserId,
                Message = await GenerateAiResponseAsync(userMessage.Message),
                Role = "assistant",
                CreatedAt = System.DateTime.UtcNow
            };

            return await _chatRepo.AddMessageAsync(aiResponse);
        }

        private async Task<string> GenerateAiResponseAsync(string userMessage)
        {
            var payload = new
            {
                model = "deepseek/deepseek-r1:free",
                messages = new[] { new { role = "user", content = userMessage } }
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            try
            {
                var response = await _httpClient.PostAsync("https://openrouter.ai/api/v1/chat/completions", content);
                response.EnsureSuccessStatusCode();

                var resultString = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(resultString);

                return doc.RootElement
                          .GetProperty("choices")[0]
                          .GetProperty("message")
                          .GetProperty("content")
                          .GetString() ?? "Sorry, AI did not return a message.";
            }
            catch
            {
                return "Sorry, I couldn't connect to the AI service. Please try again later.";
            }
        }
    }
}
