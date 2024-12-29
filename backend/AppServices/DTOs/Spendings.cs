using System.ComponentModel.DataAnnotations;

namespace AppServices.DTOs;

public class Spendings
{
    [Required]
    public required string CategoryName { get; set; }
    public decimal Amount { get; set; }
}