using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.HelperFunctions;
using API.Interfaces;
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

        public CommentController(ICommentRepository commentRepository, DataContext context)
        {
            _commentRepository = commentRepository;
            _context = context;
        }
        
        // API:     /api/comment
        [HttpGet]   // asynchronous
        /* public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            IEnumerable<Comment> commentsToReturn = await _commentRepository.GetCommentsAsync();

            return Ok(commentsToReturn);
        } */
        
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
    }
}
