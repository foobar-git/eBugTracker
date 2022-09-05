namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string FromUser { get; set; }
        public string ToUser { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsRead { get; set; }
        public string Content { get; set; }

        //_EF_Migrations__________________________
        public AppUser AppUser { get; set; }    // from AppUser
        public int AppUserId { get; set; }      // from AppUser_ID
        //________________________________________
    }
}