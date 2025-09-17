using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Office.Infrastructure.Data;
using Microsoft.Extensions.Logging;

var host = Host.CreateDefaultBuilder(args)
  .ConfigureServices((hostContext, services) =>
  {
    services.AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase("OfficeDb")); 
    services.AddHostedService<Worker>();
  })
  .Build();

host.Run();
