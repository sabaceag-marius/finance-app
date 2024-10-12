
using AppServices;
using AppServices.DTOs;
using AppServices.DTOs.Transaction;
using AppServices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/transaction")]
[ApiController]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetTransactions([FromQuery] QueryObject query)
    {
        var response = await _transactionService.QueryTransactions(query);

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
    public async Task<IActionResult> GetTransaction(int id)
    {
        var response = await _transactionService.GetTransaction(id);

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
    public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionRequestDto requestDto)
    {
        var response = await _transactionService.AddTransaction(requestDto);

        var result = response.Value;
        return CreatedAtAction(nameof(GetTransaction), new {id = result.Id},response.Value);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteTransaction(int id)
    {
        var response = await _transactionService.DeleteTransaction(id);
        
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
    public async Task<IActionResult> UpdateTransaction(int id,
        [FromBody] UpdateTransactionRequestDto requestDto)
    {
        var response = await _transactionService.UpdateTransaction(id, requestDto);
        
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