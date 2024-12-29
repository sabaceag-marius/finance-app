using System.Security.Claims;
using AppServices;
using AppServices.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ICategoryService _categoryService;

    public CategoryController(IUserService userService, ICategoryService categoryService)
    {
        _userService = userService;
        _categoryService = categoryService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserCategories()
    {
        // Get the user
        
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

        var response = await _categoryService.GetUserCategories(user);

        if (response.IsError)
        {
            return new ObjectResult(response.ErrorMessage)
            {
                StatusCode = response.ErrorStatusCode.ToStatusCode()
            };
        }

        return Ok(response.Value);
    }
    
    [HttpGet("spendings")]
    [Authorize] 
    public async Task<IActionResult> GetSpendings()
    {
        // Get the user
        
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

        var response = await _categoryService.GetSpendingsByCategory(user);

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