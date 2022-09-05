namespace API.Entities
{
    public class UsersAssigned
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //_EF_Migrations__________________________
        public Project Project { get; set; }
        public int ProjectId { get; set; }
        //________________________________________
    }
}