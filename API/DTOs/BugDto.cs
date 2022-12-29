using API.Entities;

namespace API.DTOs
{
    public class BugDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FiledByUser { get; set; }
        public string ImageURL1 { get; set; }
        public string ImageURL2 { get; set; }
        public string BugImage1 { get; set; }
        public string BugImage2 { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateResolved { get; set; } = DateTime.Now;
        public bool Edited { get; set; }
        public string Description { get; set; }
        public bool IsResolved { get; set; }
        public bool IsActive { get; set; }
        public string Images_ { get; set; }      // needed for EF to show results in browser

        //_EF_Migrations__________________________
        //public ICollection<BugImageDto> BugImages { get; set; }  // EF: one Bug (entry with many images)
        public ICollection<CommentDto> Comments { get; set; }            // EF: one bug - many comments
        public int ProjectId { get; set; }
        //________________________________________
    }
}//