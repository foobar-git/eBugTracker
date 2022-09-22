using API.Entities;

namespace API.DTOs
{
    public class BugDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FiledByUser { get; set; }
        public string ImageLocation { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateResolved { get; set; }
        public string Description { get; set; }
        public bool IsResolved { get; set; }
        public bool IsActive { get; set; }
        public string Images_ { get; set; }      // needed for EF to show results in browser

        //_EF_Migrations__________________________
        public ICollection<BugImage> Images { get; set; }  // EF: one Bug (entry with many images)
        public ICollection<Comment> Comments { get; set; }            // EF: one bug - many comments
        //public Project Project { get; set; }
        public int ProjectId { get; set; }
        //________________________________________
    }
}