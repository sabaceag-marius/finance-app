using AppServices.DTOs.User;
using Domain.Entities;

namespace AppServices.Mappers;

public static class UserMapper
{
    public static User ToUser(this RegisterRequestDto registerDto)
    {
        return new User
        {
            UserName = registerDto.Username,
            Email = registerDto.Email
        };
    }

    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            Username = user.UserName,
            Email = user.Email,
        };
    }
}