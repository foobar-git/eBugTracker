using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using API.HelperFunctions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ParseProjectData
    {
        public static async Task SeedProjects(DataContext context)
        {
            string projectData;
            List<Project> projects;


            if (await context.Projects.AnyAsync()) return;

            projectData = await System.IO.File.ReadAllTextAsync("Data/ProjectSeedData.json");
            projects = JsonSerializer.Deserialize<List<Project>>(projectData);
            foreach (var project in projects)
            {
                context.Projects.Add(project);
            }

            await context.SaveChangesAsync();
        }
    }
}