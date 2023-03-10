using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.HelperFunctions
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UsersDto>()
                .ForMember( destination => destination.Created, option => option.MapFrom (
                    source => source.DateCreated.CalculateTimeFromUserCreated()));

            CreateMap<UserUpdateDto, AppUser>();            // users editing their own profiles
            
            CreateMap<Bug, BugDto>();

            CreateMap<BugEditDto, Bug>();                   // users editing bug entries

            CreateMap<Comment, CommentDto>();

            CreateMap<CommentEditDto, Comment>();           // users editing their comments

            CreateMap<UsersAssignedDto, UsersAssigned>();   // adding and removing users from projects

            CreateMap<Project, ProjectDto>()
                .ForMember( destination => destination.Users_, option => option.MapFrom (
                    source => source.UsersAssigned.FirstOrDefault().Username) )
                .ForMember( destination => destination.Bugs_, option => option.MapFrom (
                    source => source.BugsAssigned.FirstOrDefault().Name) );

            CreateMap<ProjectEditDto, Project>();
        }
    }
}
