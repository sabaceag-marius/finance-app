﻿namespace AppServices.DTOs;

public class QueryObject
{
    public List<string>? CategoryNamesList { get; set; }
    public decimal? MinimumValue { get; set; }
    public decimal? MaximumValue { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}