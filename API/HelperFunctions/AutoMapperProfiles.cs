using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.HelperFunctions
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<AppUser, UsersDto>();       // v10
            CreateMap<AppUser, UsersDto>()
                .ForMember(destination => destination.ImageUrl, 
                option => option.MapFrom(source => source.UserImage.FirstOrDefault().Url));
            CreateMap<UserImage, UserImageDto>();
            CreateMap<BugImage, ImageDto>();
        }
    }
}