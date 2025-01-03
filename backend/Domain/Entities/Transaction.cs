
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Transaction
{
    [Key]
    public int Id { get; set; }
    
    [MaxLength(100)]
    public required string Name { get; set; }
    [MaxLength(100)]
    public string? Description { get; set; }

    [Required]
    [Range(1, Double.MaxValue)]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Value {get;set;}
    public DateOnly Date { get; set; }
    
    [ForeignKey("User")] 
    public string UserId { get; set; }
    
    [ForeignKey("Category")]
    public int CategoryId { get; set; }
    public User? User { get; set; }
    public Category? Category { get; set; }
}