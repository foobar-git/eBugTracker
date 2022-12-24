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

        [HttpPost]
        public async Task<string> Post([FromForm]FileUploadAPI objFile)
        {
            string fileUploadDirectory = "upload";                      // name of directory
            string dirChar = "//";                                      // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string location = dirChar + fileUploadDirectory + dirChar;

            if (objFile.files.Length > 0)
            {
                try
                {
                    if (!Directory.Exists(_environment.WebRootPath + location))
                    {
                        Directory.CreateDirectory(_environment.WebRootPath + location);
                    }

                    using (FileStream fileStream = System.IO.File.Create(_environment.WebRootPath + location + objFile.files.FileName))
                    {
                        objFile.files.CopyTo(fileStream);
                        fileStream.Flush();
                        return location + objFile.files.FileName;
                    }
                }
                catch (Exception ex)
                {
                    return ex.Message.ToString();
                }
            }
            else
            {
                return "Failed to upload file.";
            }
        }
    }
}
