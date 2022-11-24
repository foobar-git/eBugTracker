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
        // public async Task<ActionResult<Comment>> GetComment(int id)  // v8
        // {
        //     return await _context.Comments.FindAsync(id);
        // }
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            return await _commentRepository.GetCommentByIdAsync(id);
        }

        // [HttpGet("{commentname}")]
        // public async Task<ActionResult<Bug>> GetComment(string commentname)
        // {
        //     return await _commentRepository.GetCommentAsync(FormatName.Format(commentname));
        // }

        [HttpPut("id/{id}")]
        public async Task<ActionResult> EditComment([FromBody]CommentEditDto editComment, [FromRoute]int id)
        {
            // v16
            //var comment = await _commentRepository.UpdateCommentAsync(id, newComment);
            //return Ok();

            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment != null)
            {
                _mapper.Map(editComment, comment);
                _commentRepository.Update(comment);
            }
            if (await _commentRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to edit comment.");
        }

        [HttpDelete("dc/{id}")]
        public async Task<ActionResult> DeleteComment(int id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment != null)
            {
                _commentRepository.DeleteCommentAsync(comment);
            }
            if (await _commentRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to delete comment.");
        }

        [HttpPut("nc/")]
        public async Task<ActionResult> NewComment([FromBody]Comment newComment)
        {
            // var comment = await _context.Comments.FindAsync(id);
            // if (comment == null)
            // {
            //     await _context.Comments.AddAsync(newComment);
            // }
            // else {
            //     Console.WriteLine("Comment ID already taken.");
            // }

            await _context.Comments.AddAsync(newComment);

            if (await _commentRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to post new comment.");
        }
    }
}
