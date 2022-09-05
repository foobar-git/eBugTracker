using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Images")]   // EF name created table: 'Images' instead of 'Photo'
    public class BugImages
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }    // TODO EDIT

        //_EF_Migrations__________________________
        public Bug Bug { get; set; }            // by defining these two properties we have done what´s called
        public int BugId { get; set; }          // "fully defining the relationship" between Photo and Bug
        //________________________________________
    }
}