using API.Entities;

namespace API.DTOs
{
    public class ProjectEditDto
    {
        public string Name { get; set; }
        public string CreatedByUser { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateCompleted { get; set; } = DateTime.Now;
        public bool IsComplete { get; set; }
        public bool IsOnHold { get; set; }
        public string Description { get; set; }
        public string Users_ { get; set; }      // needed for EF to show results in browser
        public string Bugs_ { get; set; }       // needed for EF to show results in browser
        public ICollection<UsersAssigned> UsersAssigned { get; set; }
        public ICollection<Bug> BugsAssigned { get; set; }
    }
}
//