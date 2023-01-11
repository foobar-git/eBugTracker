namespace API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string PostedByUser { get; set; }
        public string Content { get; set; }
        public bool Edited { get; set; }

        //_EF_Migrations__________________________
        public int AppUserId { get; set; }
        public int BugId { get; set; }
        //________________________________________
    }
}
