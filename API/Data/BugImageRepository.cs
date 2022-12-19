using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace API.Data
{
    public class BugImageRepository : IBugImageRepository
    {
        private readonly DataContext _context;

        /*public BugRepository(DataContext context)    // v11
        {
            _context = context;
        }*/
        private readonly IMapper _mapper;
        
        public BugImageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<BugImage> GetBugImageByIdAsync(int id)
        {
            return await _context.BugImages.FindAsync(id);
        }

        public async Task<BugImageDto> GetBugImageDtoByIdAsync(int id)
        {
            return await _context.Bugs
                .ProjectTo<BugImageDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(i => i.Id == id);
        }

        public async Task<IEnumerable<BugImage>> GetBugImagesAsync()
        {
            return await _context.BugImages.ToListAsync();
        }

        public async Task<IEnumerable<BugImageDto>> GetBugImagesDtoAsync()
        {
            return await _context.Bugs
                .ProjectTo<BugImageDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // making sure that 'greater than zero' changes have been saved to the database
            // if something has been changed and saved, the returned value will be > 0.
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(BugImage bugImage)
        {
            // mark 'bug' as 'modified'
            _context.Entry(bugImage).State = EntityState.Modified;
        }
    }
}
