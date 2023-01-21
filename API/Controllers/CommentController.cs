using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class CommentController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;

        public CommentController(ICommentRepository commentRepository, DataContext context, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _context = context;
            _mapper = mapper;
        }
        
        // API:     /api/comment
        [HttpGet]   // asynchronous
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            IEnumerable<Comment> commentsToReturn = await _commentRepository.GetCommentsAsync();

            return Ok(commentsToReturn);
        }
        
        // API:     /api/comment/id/<int>
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            return await _commentRepository.GetCommentByIdAsync(id);
        }

        [HttpPut("id/{id}")]
        public async Task<ActionResult> EditComment([FromBody]CommentEditDto editComment, [FromRoute]int id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment != null)
            {
                _mapper.Map(editComment, comment);
                _commentRepository.Update(comment);
            }
            if (await _commentRepository.SaveAllAsync()) return Ok();
            //if the update fails:
            return BadRequest("Failed to edit comment.");
        }

        // API:     /api/comment/dc/<int>
        [HttpDelete("dc/{id}")]     // "dc" for delete comment
        public async Task<ActionResult> DeleteComment(int id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment != null)
            {
                _commentRepository.DeleteCommentAsync(comment);
            }
            if (await _commentRepository.SaveAllAsync()) return Ok();
            //if the update fails:
            return BadRequest("Failed to delete comment.");
        }

        // API:     /api/comment/nc/<int>
        [HttpPut("nc/")]            // "nc" for new comment
        public async Task<ActionResult> NewComment([FromBody]Comment newComment)
        {
            await _context.Comments.AddAsync(newComment);

            if (await _commentRepository.SaveAllAsync()) return Ok();
            //if the save fails:
            return BadRequest("Failed to post new comment.");
        }
    }
}
