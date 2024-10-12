using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppServices.DTOs.Transaction;

public class CreateTransactionRequestDto
{
    public required string Name { get; set; } = "";
    public string? CategoryName { get; set; } = "";
    public string? Description { get; set; } = "";
    [Required]
    [Range(1, Double.MaxValue)]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Value {get;set;}
    public DateOnly? Date { get; set; }
}