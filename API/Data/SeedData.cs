using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using API.HelperFunctions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeedData
    {
        public static async Task SeedUsers(DataContext context)
        {
            string userData;
            List<AppUser> users;


            if (await context.Users.AnyAsync()) return;

            userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            foreach (var user in users)
            {
                using HMACSHA512 hmac = new HMACSHA512();

                //user.UserName = user.UserName.ToLower();
                FormatUsername.Format(user.UserName);
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("test"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}