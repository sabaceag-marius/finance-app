using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class Category
{
    [Key]
    public int Id { get; set; }

    [MaxLength(100)]
    public string? Name {get; set;}
}