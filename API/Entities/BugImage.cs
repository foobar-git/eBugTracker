using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    //[Table("Images")]   // EF name created table: 'Images' instead of 'Photo'     v13
    public class BugImage
    {
        public int Id { get; set; }
        public string Path { get; set; }

        //_EF_Migrations__________________________
        //public Bug Bug { get; set; }            // by defining these two properties we have done what´s called
        public int BugId { get; set; }          // "fully defining the relationship" between Photo and Bug
        //________________________________________
    }
}
