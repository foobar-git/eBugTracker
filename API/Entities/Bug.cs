namespace API.Entities
{
    public class Bug
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FiledByUser { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateResolved { get; set; }
        public string Description { get; set; }
        public bool IsResolved { get; set; }
        public bool IsActive { get; set; }

        //_EF_Migrations__________________________
        public ICollection<BugImage> Images { get; set; }  // EF: one Bug (entry with many images)
        public ICollection<Comment> Comments { get; set; }
        //public Comment Comment { get; set; }
        public int CommentId { get; set; }
        //public Project Project { get; set; }
        public int ProjectId { get; set; }
        //________________________________________
    }
}