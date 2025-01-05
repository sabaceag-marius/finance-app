namespace AppServices.DTOs;

public class QueryObject
{
    public string? SearchString { get; set; }
    public string? CategoryName { get; set; }
    public decimal? MinimumValue { get; set; }
    public decimal? MaximumValue { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    
    public DateOnly? BeforeDate { get; set; }
    public DateOnly? AfterDate { get; set; }
}