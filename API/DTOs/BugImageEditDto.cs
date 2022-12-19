namespace API.Entities
{
    public class BugImageEditDto
    {
        public string Path { get; set; }
        public string PublicId { get; set; }    // TODO EDIT

        //_EF_Migrations__________________________
        //public Bug Bug { get; set; }
        public int BugId { get; set; }
        //________________________________________
    }
}
