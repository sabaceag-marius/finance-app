using AppServices.DTOs;
using AppServices.DTOs.Transaction;
using AppServices.Interfaces;
using AppServices.Mappers;
using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace AppServices.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly ICategoryService _categoryService;

    public TransactionService(ITransactionRepository transactionRepository, ICategoryService categoryService)
    {
        _transactionRepository = transactionRepository;
        _categoryService = categoryService;
    }
    
    public async Task<Response<TransactionDto>> GetTransaction(int id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);

        if (transaction == null)
        {
            return new Response<TransactionDto>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Transaction not found"
            };
        }
        
        return new Response<TransactionDto>
        {
            Value = transaction.ToDto()
        };
    }

    public async Task<Response<IEnumerable<TransactionDto>>> GetAllTransactions()
    {
        var transactions = await _transactionRepository.GetAllDataAsync();

        return new Response<IEnumerable<TransactionDto>>
        {
            Value = transactions.Select(transaction => transaction.ToDto())
        };
    }
    
    public async Task<Response<TransactionDto>> AddTransaction(CreateTransactionRequestDto requestDto)
    {
        // Transform requestDto in a transaction
        var transaction = requestDto.ToTransaction();
        
        // Get the category from the service
        string categoryName = (requestDto.CategoryName.IsNullOrEmpty() ? "misc" : requestDto.CategoryName)!;
        
        var category = await _categoryService.GetCategoryByNameAsync(categoryName);
        
        transaction.CategoryId = category.Id;

        // Add the transaction in the repo
        
        //TODO Add try for the database exceptions?
        
        _transactionRepository.Add(transaction);

        // For some reason I can't add this before
        transaction.Category = category;
        
        return new Response<TransactionDto>
        {
            Value = transaction.ToDto()
        };
    }
    
    public async Task<Response<TransactionDto>> UpdateTransaction(int id, UpdateTransactionRequestDto requestDto)
    {
        // Check if there's a transaction with this id
        
        var oldTransaction = await _transactionRepository.GetByIdAsyncNoTracking(id);

        if (oldTransaction == null)
        {
            return new Response<TransactionDto>
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Transaction not found!"
            };
        }
        
        //|| oldTransaction.UserId != user.Id)
        // {
        //     return new CommandResponse<TransactionDto?>
        //     {
        //         IsError = true,
        //         ErrorStatusCode = ErrorStatusCodes.Unauthorized,
        //         ErrorMessage = "Unauthorized"
        //     };
        // }
        
        var transaction = requestDto.ToTransaction();
        transaction.Id = id;
        
        //Get the category of the old transaction
        var oldCategory = oldTransaction.Category;

        // Only do the category query if the category name is different
        
        if (oldCategory.Name == requestDto.CategoryName)
        {
            transaction.Category = oldCategory;
            transaction.CategoryId = oldCategory.Id;
        }
        else
        {
            string categoryName = requestDto.CategoryName ?? "misc";
        
            var category = await _categoryService.GetCategoryByNameAsync(categoryName);
        
            transaction.Category = category;
            transaction.CategoryId = category.Id;
        }
        
        await _transactionRepository.UpdateAsync(transaction);

        return new Response<TransactionDto>
        {
            Value = transaction.ToDto()
        };
    }

    public async Task<Response> DeleteTransaction(int id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);

        if (transaction == null)
        {
            return new Response
            {
                IsError = true,
                ErrorStatusCode = ErrorStatusCodes.NotFound,
                ErrorMessage = "Transaction not found"
            };
        }

        await _transactionRepository.DeleteAsync(id);

        return new Response();
    }

    

    public async Task<Response<IEnumerable<TransactionDto>>> QueryTransactions(QueryObject query)
    {
        var specification = query.ToSpecification();

        var transactions =
            await _transactionRepository.GetPaginatedDataWithSpecificationAsync(specification, query.PageNumber,
                query.PageSize);

        return new Response<IEnumerable<TransactionDto>>
        {
            Value = transactions.Select(transaction => transaction.ToDto())
        };

    }
}