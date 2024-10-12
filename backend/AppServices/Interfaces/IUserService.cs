using AppServices.DTOs.User;
using Domain.Entities;

namespace AppServices.Interfaces;

public interface IUserService
{
    public Task<Response<UserDto>> Register(RegisterRequestDto registerDto);
    public Task<Response<UserDto>> Login(LoginRequestDto loginDto);
}