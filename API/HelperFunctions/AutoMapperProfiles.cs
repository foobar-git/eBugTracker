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
            //CreateMap<AppUser, UsersDto>();       // v10
            // CreateMap<AppUser, UsersDto>()       // v11
            //     .ForMember( destination => destination.ImageUrl, option => option.MapFrom (
            //         source => source.UserImage.FirstOrDefault().Url) );

            CreateMap<AppUser, UsersDto>()
                .ForMember( destination => destination.Created, option => option.MapFrom (
                    source => source.DateCreated.CalculateTimeFromUserCreated()));

            CreateMap<UserUpdateDto, AppUser>();        // users editing their own profiles

            CreateMap<CommentEditDto, Comment>();       // users editing their comments
            
            CreateMap<BugEditDto, Bug>();               // users editing bug entries

            CreateMap<Project, ProjectDto>()
                .ForMember( destination => destination.Users_, option => option.MapFrom (
                    source => source.UsersAssigned.FirstOrDefault().Username) )
                // .ForMember( destination => destination.BugsAssigned_, option => option.MapFrom (
                //     source => source.BugsAssigned.FirstOrDefault().Name) );
                .ForMember( destination => destination.Bugs_, option => option.MapFrom (
                    source => source.BugsAssigned.FirstOrDefault().Name) );
            
            CreateMap<Bug, BugDto>()
                .ForMember( destination => destination.ImageLocation, option => option.MapFrom (
                    source => source.BugImages.FirstOrDefault().Location) );

            CreateMap<BugImage, BugImageDto>();

            CreateMap<Comment, CommentDto>();
        }
    }
}
//