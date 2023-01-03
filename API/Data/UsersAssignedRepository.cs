using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace API.Data
{
    public class UsersAssignedRepository : IUsersAssignedRepository
    {
        private readonly DataContext _context;

        private readonly IMapper _mapper;
        
        public UsersAssignedRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        
        public async Task<IEnumerable<UsersAssigned>> GetUsersAssignedAsync()
        {
            return await _context.UsersAssigned.ToListAsync();
        }
        
        public async Task<UsersAssigned> GetUsersAssignedByIdAsync(int id)
        {
            return await _context.UsersAssigned.FindAsync(id);
        }

        public async Task<UsersAssigned> GetUsersAssignedAsync(string username)
        {
            return await _context.UsersAssigned.SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // making sure that 'greater than zero' changes have been saved to the database
            // if something has been changed and saved, the returned value will be > 0.
            return await _context.SaveChangesAsync() > 0;
        }

        /* public async Task<Comment> UpdateCommentAsync(int id, CommentEditDto newComment)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                comment.Content = newComment.Content;
                await _context.SaveChangesAsync();
            }
        } */

        public void Update(UsersAssigned usersAssigned)
        {
            // mark 'comment' as 'modified'
            _context.Entry(usersAssigned).State = EntityState.Modified;
        }

        public void DeleteUsersAssignedAsync(UsersAssigned usersAssigned)
        {
            _context.UsersAssigned.Remove(usersAssigned);
        }
    }
}