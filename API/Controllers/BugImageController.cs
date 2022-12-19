using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.HelperFunctions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    [AllowAnonymous]
    public class BugImageController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IBugImageRepository _bugImageRepository;
        private readonly IMapper _mapper;

        public BugImageController(IBugImageRepository bugImageRepository, DataContext context, IMapper mapper)
        {
            _bugImageRepository = bugImageRepository;
            _context = context;
            _mapper = mapper;
        }
        
        // API:     /api/bugimages
        [HttpGet]   // asynchronous
        public async Task<ActionResult<IEnumerable<BugImageDto>>> GetBugImages()
        {
            IEnumerable<BugImageDto> bugImagesToReturn = await _bugImageRepository.GetBugImagesDtoAsync();

            return Ok(bugImagesToReturn);
        }
        
        // API:     /api/bugimage/id/<int>
        [HttpGet("id/{id}")]
        public async Task<ActionResult<BugImageDto>> GetBugImage(int id)
        {
            return await _bugImageRepository.GetBugImageDtoByIdAsync(id);
        }

        [HttpPut("id/{id}")]
        public async Task<ActionResult> EditBugImage([FromBody]BugImageEditDto editBugImage, [FromRoute]int id)
        {
            var bugImage = await _bugImageRepository.GetBugImageByIdAsync(id);
            if (bugImage != null)
            {
                _mapper.Map(editBugImage, bugImage);
                _bugImageRepository.Update(bugImage);
            }
            if (await _bugImageRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to edit bug.");
        }
    }
}
