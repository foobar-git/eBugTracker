using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    //[AllowAnonymous]
    public class FileUploadController: ControllerBase
    {
        public static IWebHostEnvironment _environment;
        
        public FileUploadController (IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public class FileUploadAPI
        {
            public IFormFile files { get; set; }
        }

        // API:     /api/fileupload/"project_id"/"bug_id"
        [HttpPut("{pid}/{bid}")]
        public async Task<ActionResult> SaveFileToDirectory([FromRoute]int pid, [FromRoute]int bid, [FromForm]FileUploadAPI objFile)
        {
            string dirChar = "//";                                  // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string fileUploadDirectory = "api" + dirChar + "upload" + dirChar + pid + dirChar + bid;
            string location = dirChar + fileUploadDirectory + dirChar;

            if (objFile.files.Length > 0)
            {
                try
                {
                    if (!Directory.Exists(_environment.WebRootPath + location))
                    {
                        Directory.CreateDirectory(_environment.WebRootPath + location);
                    }

                    SetFileStream(location, objFile);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message.ToString());
                }
            }
            else
            {
                return BadRequest("Failed to upload file.");
            }
        }

        private string SetFileStream(string location, FileUploadAPI objFile) {
            using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + location + objFile.files.FileName))
            {
                objFile.files.CopyTo(fileStream);
                fileStream.Flush();
                return location + objFile.files.FileName;
            }
        }

        // API:     /api/fileupload/df/"project_id"/"bug_id"/"filename"
        [HttpDelete("df/{pid}/{bid}/{filename}")]                   // "df" for "delete file"
        public async Task<ActionResult> DeleteFile([FromRoute]int pid, [FromRoute]int bid, [FromRoute]string filename)
        {
            string dirChar = "//";                                  // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string fileUploadDirectory = "api" + dirChar + "upload" + dirChar + pid + dirChar + bid + dirChar;
            string location = dirChar + fileUploadDirectory + dirChar;

            if (Directory.Exists(_environment.WebRootPath + location))
            {
                var pathToFile = _environment.WebRootPath + location;
                System.IO.File.Delete(pathToFile + filename);
                return Ok();
            }
            //Console.WriteLine("No such file.");
            return BadRequest("No such file.");
        }
    }
}
