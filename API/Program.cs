using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        /*public static void Main(string[] args)      // v7
        {
            CreateHostBuilder(args).Build().Run();    // v7
        }*/

        public static async Task Main(string[] args)
        {
            DataContext context;
            ILogger logger;

            IHost host = CreateHostBuilder(args).Build();
            using IServiceScope scope = host.Services.CreateScope();
            IServiceProvider services = scope.ServiceProvider;

            try // catch any exceptions that may occur during the seeding of data
            {
                context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
                await SeedData.SeedUsers(context);
            }
            catch (Exception ex) {
                logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during seeding of data and migration");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
