using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using API.HelperFunctions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ParseSeedData
    {
        public static async Task SeedUsers(DataContext context)
        {
            string userData;
            List<AppUser> users;


            if (await context.AppUsers.AnyAsync()) return;

            userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach (var user in users)
            {
                using HMACSHA512 hmac = new HMACSHA512();

                //user.UserName = user.UserName.ToLower();
                FormatName.Format(user.Username);                                     // setting all passwords
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("test")); // for testing purposes
                user.PasswordSalt = hmac.Key;

                context.AppUsers.Add(user);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedProjects(DataContext context)
        {
            string projectData;
            List<Project> projects;


            if (await context.Projects.AnyAsync()) return;

            projectData = await System.IO.File.ReadAllTextAsync("Data/ProjectSeedData.json");
            projects = JsonSerializer.Deserialize<List<Project>>(projectData);
            foreach (var project in projects)
            {
                //FormatName.Format(user.UserName);
                context.Projects.Add(project);
            }

            await context.SaveChangesAsync();
        }
    }
}