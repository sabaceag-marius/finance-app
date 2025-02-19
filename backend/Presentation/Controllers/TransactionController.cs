﻿
using System.Security.Claims;
using AppServices;
using AppServices.DTOs;
using AppServices.DTOs.Transaction;
using AppServices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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
    
    [HttpGet]
    [Authorize]
    [Route("count")]
    public async Task<IActionResult> GetTransactionsCount([FromQuery] QueryObject query)
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
        
        var response = await _transactionService.GetFilteredTransactionsCountAsync(query, user);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }
        
        return Ok(response.Value);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetTransaction([FromRoute] int id)
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
        if (!ModelState.IsValid)
        {
            // get all messages
            var errorMessage = ModelState.Values
                .SelectMany(x => x.Errors)
                .Select(x => x.ErrorMessage)
                .Aggregate((a, b) => $"{a} {b}");
            //.Append(new ModelError("Error creating transaction"))
                //.ErrorMessage;
            return new ObjectResult(new {errorMessage = errorMessage})
            {
                StatusCode = ErrorStatusCodes.BadRequest.ToStatusCode(),
            };
        }
        
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
    [Route("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteTransaction([FromRoute] int id)
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
    [Route("{id}")]
    public async Task<IActionResult> UpdateTransaction([FromRoute] int id,
        [FromBody] UpdateTransactionRequestDto requestDto)
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