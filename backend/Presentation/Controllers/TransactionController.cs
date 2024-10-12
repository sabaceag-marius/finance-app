
using System.Security.Claims;
using AppServices;
using AppServices.DTOs;
using AppServices.DTOs.Transaction;
using AppServices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/transactions")]
[ApiController]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;
    private readonly IUserService _userService;

    public TransactionController(ITransactionService transactionService, IUserService userService)
    {
        _transactionService = transactionService;
        _userService = userService;
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetTransactions([FromQuery] QueryObject query)
    {
        var username = User.FindFirstValue(ClaimTypes.GivenName);

        var user = await _userService.GetUserByNameAsync(username);
        
        // This shouldn't happen since we have the 'Authorize' attribute
        if (user == null)
        {
            return new ObjectResult("Unauthorized")
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode()
            };
        }
        
        var response = await _transactionService.QueryTransactions(query, user);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }
        
        return Ok(response.Value);
    }

    [HttpGet("id:int")]
    [Authorize]
    public async Task<IActionResult> GetTransaction(int id)
    {
        var username = User.FindFirstValue(ClaimTypes.GivenName);

        var user = await _userService.GetUserByNameAsync(username);
        
        // This shouldn't happen since we have the 'Authorize' attribute
        if (user == null)
        {
            return new ObjectResult("Unauthorized")
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode()
            };
        }
        
        var response = await _transactionService.GetTransaction(id, user);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }
        
        return Ok(response.Value);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionRequestDto requestDto)
    {
        var username = User.FindFirstValue(ClaimTypes.GivenName);

        var user = await _userService.GetUserByNameAsync(username);
        
        // This shouldn't happen since we have the 'Authorize' attribute
        if (user == null)
        {
            return new ObjectResult("Unauthorized")
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode()
            };
        }
        
        var response = await _transactionService.AddTransaction(requestDto, user);

        var result = response.Value;
        return CreatedAtAction(nameof(GetTransaction), new {id = result.Id},response.Value);
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeleteTransaction(int id)
    {
        var username = User.FindFirstValue(ClaimTypes.GivenName);

        var user = await _userService.GetUserByNameAsync(username);
        
        // This shouldn't happen since we have the 'Authorize' attribute
        if (user == null)
        {
            return new ObjectResult("Unauthorized")
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode()
            };
        }
        
        var response = await _transactionService.DeleteTransaction(id, user);
        
        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return NoContent();
    }

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateTransaction(int id,
        [FromBody] UpdateTransactionRequestDto requestDto)
    {
        var username = User.FindFirstValue(ClaimTypes.GivenName);

        var user = await _userService.GetUserByNameAsync(username);
        
        // This shouldn't happen since we have the 'Authorize' attribute
        if (user == null)
        {
            return new ObjectResult("Unauthorized")
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode()
            };
        }
        
        var response = await _transactionService.UpdateTransaction(id, requestDto, user);
        
        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok(response.Value);
    }
}