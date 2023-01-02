using API.DTOs;

namespace API.Entities
{
    public class UsersAssigned
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
        public string UserType { get; set; }

        //_EF_Migrations__________________________
        public Project Project { get; set; }
        public int ProjectId { get; set; }
        //________________________________________
    }
}