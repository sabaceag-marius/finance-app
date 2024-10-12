using AppServices.DTOs.User;
using Domain.Entities;

namespace AppServices.Mappers;

public static class UserMapper
{
    public static User ToUser(this RegisterRequestDto registerDto)
    {
        return new User
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };
    }

    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            UserName = user.UserName,
            Email = user.Email
        };
    }
}