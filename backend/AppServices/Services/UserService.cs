using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AppServices.DTOs.User;
using AppServices.Interfaces;
using AppServices.Mappers;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AppServices.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly SignInManager<User> _signInManager;
    private readonly SymmetricSecurityKey _key;
    
    public UserService(UserManager<User> userManager, IConfiguration configuration, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _configuration = configuration;
        _signInManager = signInManager;
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SigningKey"]));
        
    }
    
    public async Task<Response<UserDto>> Register(RegisterRequestDto registerDto)
    {
        var user = registerDto.ToUser();

        var createdUser = await _userManager.CreateAsync(user, registerDto.Password);
        
        if (!createdUser.Succeeded)
        {
            return new Response<UserDto>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = createdUser.Errors.First().Description
            };
        }
        
        var roleResult = await _userManager.AddToRoleAsync(user, "User");

        if (!roleResult.Succeeded) 
        {
            return new Response<UserDto>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = "Role assigning failed!"
            };
        }

        var userDto = user.ToDto();
        userDto.Token = CreateToken(user);

        return new Response<UserDto>
        {
            Value = userDto
        };
    }
    
    public async Task<Response<UserDto>> Login(LoginRequestDto loginDto)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username);

        if (user == null)
        {
            return new Response<UserDto>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = "Invalid username and/or password!"
            };
        }
        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password,false);

        if (!result.Succeeded) {
            return new Response<UserDto>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = "Invalid username and/or password!"
            };
        }

        var userDto = user.ToDto();
        userDto.Token = CreateToken(user);

        return new Response<UserDto>
        {
            Value = userDto
        };
    }

    public string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.GivenName, user.UserName),
        };

        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = credentials,
            Issuer = _configuration["JWT:Issuer"],
            Audience = _configuration["JWT:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
    
    public async Task<User?> GetUserByNameAsync(string username)
    {
        var user = await _userManager.FindByNameAsync(username);

        return user;
    }

    public async Task<Response> DeleteUser(User user)
    {
        
        var result= await _userManager.DeleteAsync(user);
        
        if (!result.Succeeded)
        {
            return new Response
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.BadRequest,
                ErrorMessage = result.Errors.First().Description
            };
        }
        
        return new Response();
    }
}