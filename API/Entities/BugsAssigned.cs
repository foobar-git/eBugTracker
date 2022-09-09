using API.DTOs;

namespace API.Entities
{
    public class BugsAssigned
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //_EF_Migrations__________________________
        public Project Project { get; set; }
        public int ProjectId { get; set; }
        public Bug Bug { get; set; }
        //________________________________________
    }
}