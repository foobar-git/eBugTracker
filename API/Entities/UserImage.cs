using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class UserImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }    // TODO EDIT

        //_EF_Migrations__________________________
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        //________________________________________
    }
}
