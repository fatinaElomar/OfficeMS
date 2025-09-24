using Office.Infrastructure.Repositories;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Office.Data.Entities;
using Office.Data.Interfaces;
using System;

namespace Office.Application.Services
{
    public class ChatService : IChatService
    {
        private readonly ChatRepository _chatRepo;
        private readonly IGenericRepository<AlChat> _chatRepository;
        private readonly HttpClient _httpClient;
        private readonly string _ollamaUrl;

        public ChatService(
            ChatRepository chatRepo,
            IGenericRepository<AlChat> chatRepository,
            string ollamaUrl = "http://127.0.0.1:11434") // default local Ollama
        {
            _chatRepo = chatRepo;
            _chatRepository = chatRepository;
            _httpClient = new HttpClient();
            _ollamaUrl = ollamaUrl;
        }

        // Add a new user message
        public async Task<AlChat> AddMessageAsync(AlChat chat)
        {
            if (chat == null) throw new ArgumentNullException(nameof(chat));

            chat.CreatedAt = DateTime.UtcNow;
            return await _chatRepo.AddMessageAsync(chat);
        }

        // Get all messages for a specific request
        public async Task<List<AlChat>> GetMessagesByRequestIdAsync(long requestId)
        {
            var allMessages = await _chatRepository.GetAllAsync();
            return allMessages
                .Where(c => c.RequestId == requestId)
                .OrderBy(c => c.CreatedAt)
                .ToList();
        }

        // Get all messages by a specific user
        public async Task<List<AlChat>> GetMessagesByUserIdAsync(long userId)
        {
            var allMessages = await _chatRepository.GetAllAsync();
            return allMessages
                .Where(c => c.UserId == userId)
                .OrderBy(c => c.CreatedAt)
                .ToList();
        }

        // Save user message and generate AI response
        public async Task<AlChat> GetAiResponseAsync(AlChat userMessage)
        {
            if (userMessage == null) throw new ArgumentNullException(nameof(userMessage));

            // Save user message
            userMessage.CreatedAt = DateTime.UtcNow;
            await _chatRepo.AddMessageAsync(userMessage);

            // Generate AI response
            var aiResponse = new AlChat
            {
                RequestId = userMessage.RequestId,
                UserId = userMessage.UserId,
                Message = await GenerateAiResponseAsync(userMessage.Message),
                Role = "assistant",
                CreatedAt = DateTime.UtcNow
            };

            return await _chatRepo.AddMessageAsync(aiResponse);
        }

        // Call the local Ollama model
        private async Task<string> GenerateAiResponseAsync(string userMessage)
        {
            if (string.IsNullOrWhiteSpace(userMessage)) return "Please provide a message.";

            var payload = new
            {
                model = "qwen2.5-coder:1.5b",
                prompt = userMessage,
                max_tokens = 200
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync($"{_ollamaUrl}/v1/completions", content);
                response.EnsureSuccessStatusCode();

                var resultString = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(resultString);

                // Extract the "completion" field returned by Ollama
                return doc.RootElement
                          .GetProperty("completion")
                          .GetString() ?? "Sorry, AI did not return a message.";
            }
            catch
            {
                return "Sorry, I couldn't connect to the local AI service. Make sure Ollama is running.";
            }
        }
    }
}
