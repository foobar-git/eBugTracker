using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICommentRepository
    {
        void Update(Comment comment);

        void DeleteCommentAsync(Comment comment);

        Task<bool> SaveAllAsync();
        
        //Task<Comment> UpdateCommentAsync(int id, CommentEditDto newComment);

        Task<IEnumerable<Comment>> GetCommentsAsync();

        Task<Comment> GetCommentByIdAsync(int id);
        
        //Task<Comment> GetCommentAsync(string commentname);

        //Task<IEnumerable<CommentDto>> GetCommentsDtoAsync();

        //Task<CommentDto> GetCommentDtoByIdAsync(int id);

        //Task<CommentDto> GetCommentDtoAsync(string commentname);
    }
}
