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
                .ForMember( destination => destination.ImageUrl, option => option.MapFrom (
                    source => source.UserImage.FirstOrDefault().Url) )
                .ForMember( destination => destination.Created, option => option.MapFrom (
                    source => source.DateCreated.CalculateTimeFromUserCreated()));
            
            CreateMap<UserImage, UserImageDto>();

            CreateMap<Project, ProjectDto>()
                .ForMember( destination => destination.BugsAssigned, option => option.MapFrom (
                    source => source.BugsAssigned.FirstOrDefault().Bug) );
            
            CreateMap<BugImage, ImageDto>();
        }
    }
}