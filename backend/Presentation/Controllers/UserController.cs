using System.Security.Claims;
using AppServices;
using AppServices.DTOs.User;
using AppServices.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[ApiController]
[Route("api/accounts")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITransactionService _transactionService;

    public UserController(IUserService userService, ITransactionService transactionService)
    {
        _userService = userService;
        _transactionService = transactionService;
    }

    [HttpPost("register")]

    public async Task<IActionResult> RegisterUser([FromBody] RegisterRequestDto registerDto)
    {
        if (!ModelState.IsValid)
        {
            var errorMessage = ModelState.Values
                .SelectMany(x => x.Errors)
                .First()
                .ErrorMessage;
            return new ObjectResult(new {errorMessage = errorMessage})
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
            };
        }
        var response = await _userService.Register(registerDto);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }
        
        return Ok(response.Value);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginUser([FromBody] LoginRequestDto registerDto)
    {
        
        if (!ModelState.IsValid)
        {
            var errorMessage = ModelState.Values
                .SelectMany(x => x.Errors)
                .First()
                .ErrorMessage;
            return new ObjectResult(new {errorMessage = errorMessage})
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
            };
        }
        
        var response = await _userService.Login(registerDto);
        
        if (response.IsError)
        {
            return new ObjectResult(new {errorMessage = response.ErrorMessage})
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }
        
        return Ok(response.Value);
    }

    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteUser()
    {
        var username = User.FindFirstValue(ClaimTypes.GivenName);
        var user = await _userService.GetUserByNameAsync(username);
        
        if (user == null)
        {
            return new ObjectResult("Unauthorized")
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode()
            };
        }
        
        await _transactionService.DeleteUserTransactions(user);

        var response = await _userService.DeleteUser(user);
        
        if (response.IsError)
        {
            return new ObjectResult(new {errorMessage = response.ErrorMessage})
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }
        
        return NoContent();
    }
}