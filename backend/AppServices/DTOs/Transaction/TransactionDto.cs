namespace AppServices.DTOs.Transaction;

public class TransactionDto
{
    
    public int Id { get; set; }
    
    public required string Name { get; set; }
    public string? CategoryName { get; set; }
    public string? Description { get; set; }
    public decimal Value {get;set;}
    public DateOnly? Date { get; set; }


}