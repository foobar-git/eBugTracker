namespace API.Entities
{
    public class BugImageDto
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string PublicId { get; set; }    // TODO EDIT

        //_EF_Migrations__________________________
        //public Bug Bug { get; set; }            // by defining these two properties we have done what´s called
        public int BugId { get; set; }
        //________________________________________
    }
}
