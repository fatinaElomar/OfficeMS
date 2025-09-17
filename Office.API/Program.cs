using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Office.Infrastructure.Data;
using Office.Application.Services;
using Office.Application.Helpers;
using Office.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers()
  .AddJsonOptions(options => {
    options.JsonSerializerOptions.AllowTrailingCommas = true;
  });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// CORS (development)
builder.Services.AddCors(options => {
  options.AddPolicy("DevCors", policy => {
    policy.WithOrigins(
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    )
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials();
  });
});
// DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
  options.UseSqlServer(connectionString));

// Register repositories & services
builder.Services.AddScoped(typeof(Office.Data.Interfaces.IGenericRepository<>), typeof(Office.Infrastructure.Repositories.GenericRepository<>));
builder.Services.AddScoped<Office.Data.Interfaces.IUserRepository, Office.Infrastructure.Repositories.UserRepository>();
builder.Services.AddScoped<Office.Data.Interfaces.ILegalRequestRepository, Office.Infrastructure.Repositories.LegalRequestRepository>();
builder.Services.AddScoped<Office.Data.Interfaces.IPaymentRepository, Office.Infrastructure.Repositories.PaymentRepository>();
builder.Services.AddScoped<Office.Data.Interfaces.INotificationRepository, Office.Infrastructure.Repositories.NotificationRepository>();
builder.Services.AddScoped<Office.Infrastructure.Repositories.ChatRepository>();

// Helpers
var jwtSecret = builder.Configuration.GetValue<string>("Jwt:Secret") ?? "dev_secret_1234567890";
builder.Services.AddSingleton(new JwtTokenGenerator(jwtSecret));
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<ChatService>();
builder.Services.AddSingleton(new EmailSender(
  builder.Configuration.GetValue<string>("Email:From") ?? "no-reply@example.com",
  builder.Configuration.GetValue<string>("Email:Host") ?? "smtp.gmail.com",
  builder.Configuration.GetValue<int>("Email:Port") == 0 ? 587 : builder.Configuration.GetValue<int>("Email:Port"),
  builder.Configuration.GetValue<string>("Email:Username") ?? string.Empty,
  builder.Configuration.GetValue<string>("Email:Password") ?? string.Empty,
  builder.Configuration.GetValue<bool?>("Email:EnableSsl") ?? true
));
Environment.SetEnvironmentVariable("VERIFICATION_BASE_URL", builder.Configuration.GetValue<string>("Verification:BaseUrl") ?? "http://localhost:5173/verify-email");

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("DevCors");
app.MapControllers();
app.Run();
