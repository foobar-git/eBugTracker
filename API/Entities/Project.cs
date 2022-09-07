using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string CreatedByUser { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCompleted { get; set; }
        public bool IsComplete { get; set; }
        public bool IsOnHold { get; set; }
        public string Description { get; set; }

        //_EF_Migrations__________________________
        public ICollection<UsersAssigned> UsersAssigned { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public Bug Bug { get; set; }            // one project - many bugs
        //________________________________________
    }
}