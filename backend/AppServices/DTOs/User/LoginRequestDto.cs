using System.ComponentModel.DataAnnotations;

namespace AppServices.DTOs.User;

public class LoginRequestDto
{
    [Required] 
    public string Username { get; set; } = "";

    [Required]
    public string Password { get; set; } = "";
}