using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace API.Data
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _context;

        private readonly IMapper _mapper;
        
        public CommentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        
        public async Task<Comment> GetCommentByIdAsync(int id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<IEnumerable<Comment>> GetCommentsAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // making sure that 'greater than zero' changes have been saved to the database
            // if something has been changed and saved, the returned value will be > 0.
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Comment comment)
        {
            // mark 'comment' as 'modified'
            _context.Entry(comment).State = EntityState.Modified;
        }

        public void DeleteCommentAsync(Comment comment)
        {
            _context.Comments.Remove(comment);
        }
    }
}