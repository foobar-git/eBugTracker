namespace API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string PostedByUser { get; set; }
        public string Content { get; set; }

        //_EF_Migrations__________________________
        //public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public int BugId { get; set; }
        //________________________________________
    }
}
