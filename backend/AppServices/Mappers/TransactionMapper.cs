using AppServices.DTOs.Transaction;
using Domain.Entities;

namespace AppServices.Mappers;

public static class TransactionMapper
{
    public static TransactionDto ToDto(this Transaction transaction)
    {
        
        return new TransactionDto
        {
            Id = transaction.Id,
            Name = transaction.Name,
            Description = transaction.Description,
            Value = transaction.Value,
            Date = transaction.Date,
            CategoryName = transaction.Category.Name
        };

    }

    public static Transaction ToTransaction(this CreateTransactionRequestDto transactionDto)
    {
        return new Transaction
        {
            Name = transactionDto.Name,
            Description = transactionDto.Description,
            Value = transactionDto.Value,
            Date = transactionDto.Date ?? DateOnly.FromDateTime(DateTime.Today)
        };
    }
    
    public static Transaction ToTransaction(this UpdateTransactionRequestDto transactionDto)
    {
        return new Transaction
        {
            Name = transactionDto.Name,
            Description = transactionDto.Description,
            Value = transactionDto.Value,
            Date = transactionDto.Date ?? DateOnly.FromDateTime(DateTime.Today)
        };
    }
}