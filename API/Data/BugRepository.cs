using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace API.Data
{
    public class BugRepository : IBugRepository
    {
        private readonly DataContext _context;

        /*public BugRepository(DataContext context)    // v11
        {
            _context = context;
        }*/
        private readonly IMapper _mapper;
        
        public BugRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Bug> GetBugByIdAsync(int id)
        {
            return await _context.Bugs.FindAsync(id);
        }

        public async Task<BugDto> GetBugDtoByIdAsync(int id)
        {
            return await _context.Bugs
                .ProjectTo<BugDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Bug> GetBugAsync(string bugname)
        {
            //return await _context.Bugs.Include(image => image.BugImages).SingleOrDefaultAsync(bug => bug.Name == bugname);
            return await _context.Bugs.SingleOrDefaultAsync(bug => bug.Name == bugname);
        }

        public async Task<IEnumerable<Bug>> GetBugsAsync()
        {
            //return await _context.Bugs.Include(image => image.BugImages).ToListAsync();
            return await _context.Bugs.ToListAsync();
        }

        public async Task<IEnumerable<BugDto>> GetBugsDtoAsync()
        {
            return await _context.Bugs
                .ProjectTo<BugDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<BugDto> GetBugDtoAsync(string bugname)
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
            
            return await _context.Bugs
                .Where(b => b.Name == bugname)
                .ProjectTo<BugDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // making sure that 'greater than zero' changes have been saved to the database
            // if something has been changed and saved, the returned value will be > 0.
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Bug bug)
        {
            // mark 'bug' as 'modified'
            _context.Entry(bug).State = EntityState.Modified;
        }

        // v30
        /* public void DeleteBugAsync(Bug bug)
        {
            _context.Bugs.Remove(bug);
        } */
        
        public async Task DeleteBugAsync(Bug bug)
        {
            await Task.Run( () => {
                _context.Bugs.Remove(bug);
                //Console.WriteLine(">>>>>> Starting to wait");
            });
        }
    }
}
