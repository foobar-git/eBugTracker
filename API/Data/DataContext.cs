using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Bug> Bugs { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<UserImage> UserImage { get; set; }
        public DbSet<BugImages> Images { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}