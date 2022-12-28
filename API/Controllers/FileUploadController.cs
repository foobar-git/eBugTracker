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

        // API:     /api/fileupload/
        [HttpPut]
        public async Task<ActionResult> SaveFileToDirectory([FromForm]FileUploadAPI objFile)
        {
            string fileUploadDirectory = "upload";                      // name of directory
            string dirChar = "//";                                      // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string location = dirChar + fileUploadDirectory + dirChar;

            if (objFile.files.Length > 0)
            {
                // try
                // {
                //     if (!Directory.Exists(_environment.WebRootPath + location))
                //     {
                //         Directory.CreateDirectory(_environment.WebRootPath + location);
                //     }

                //     using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + location + objFile.files.FileName))
                //     {
                //         objFile.files.CopyTo(fileStream);
                //         fileStream.Flush();
                //         return location + objFile.files.FileName;
                //     }
                // }
                // catch (Exception ex)
                // {
                //     return ex.Message.ToString();
                // }

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

        // API:     /api/fileupload/df/{filename}
        [HttpDelete("df/{filename}")]
        public async Task<ActionResult> DeleteFile(string filename)
        {
            string fileUploadDirectory = "upload";                      // name of directory
            string dirChar = "//";                                      // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string location = dirChar + fileUploadDirectory + dirChar;

            if (Directory.Exists(_environment.WebRootPath + location))
            {
                var pathToFile = _environment.WebRootPath + location;
                System.IO.File.Delete(pathToFile + filename);
                //Console.WriteLine("EDIT >>> " + pathToFile + filename);
                return Ok();
            }
            Console.WriteLine("No such file.");
            return BadRequest("No such file.");
        }
    }
}
