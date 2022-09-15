using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CreatedByUser { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCompleted { get; set; }
        public bool IsComplete { get; set; }
        public bool IsOnHold { get; set; }
        public string Description { get; set; }

        //_EF_Migrations__________________________
        public ICollection<UsersAssigned> UsersAssigned { get; set; }
        //public ICollection<BugsAssigned> BugsAssigned { get; set; }
        public ICollection<Bug> BugsAssigned { get; set; }
        //________________________________________
    }
}