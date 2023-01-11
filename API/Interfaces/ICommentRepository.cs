using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICommentRepository
    {
        void Update(Comment comment);

        void DeleteCommentAsync(Comment comment);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Comment>> GetCommentsAsync();

        Task<Comment> GetCommentByIdAsync(int id);
    }
}
