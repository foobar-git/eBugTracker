using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        /*public UserRepository(DataContext context)    // v11
        {
            _context = context;
        }*/
        private readonly IMapper _mapper;
        
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.AppUsers.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.AppUsers.Include(image => image.UserImage).SingleOrDefaultAsync(user => user.Username == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.AppUsers.Include(image => image.UserImage).ToListAsync();
        }

        public async Task<IEnumerable<UsersDto>> GetUsersDtoAsync()
        {
            return await _context.AppUsers
                .ProjectTo<UsersDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<UsersDto> GetUserDtoAsync(string username)
        {
            /*return await _context.Users               // v11
                .Where(u => u.UserName == username)
                .Select(user => new UsersDto
                {
                    // manualy mapping the porperties that we need form the database
                    //Id = user.Id,
                    //Username = user.UserName,
                    //...
                    //. . .
                }).SingleOrDefaultAsync();*/
            
            return await _context.AppUsers
                .Where(u => u.Username == username)
                .ProjectTo<UsersDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // making sure that 'greater than zero' changes have been saved to the database
            // if something has been changed and saved, the returned value will be > 0.
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            // mark 'user' as 'modified'
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}