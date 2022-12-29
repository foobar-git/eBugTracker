namespace API.Entities
{
    public class Bug
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FiledByUser { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateResolved { get; set; } = DateTime.Now;
        public bool Edited { get; set; }
        public string Description { get; set; }
        public string ImageURL1 { get; set; }
        public string ImageURL2 { get; set; }
        public string BugImage1 { get; set; }
        public string BugImage2 { get; set; }
        public bool IsResolved { get; set; }
        public bool IsActive { get; set; }

        //_EF_Migrations__________________________
        //public ICollection<BugImage> BugImages { get; set; }  // EF: one Bug (entry with many images)
        public ICollection<Comment> Comments { get; set; }
        public int ProjectId { get; set; }
        //________________________________________
    }
}
