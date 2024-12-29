using AppServices.DTOs;
using AppServices.DTOs.Category;
using AppServices.Interfaces;
using AppServices.Mappers;
using Domain.Entities;
using Domain.Interfaces;

namespace AppServices.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly ITransactionRepository _transactionRepository;

    public CategoryService(ICategoryRepository categoryRepository, ITransactionRepository transactionRepository)
    {
        _categoryRepository = categoryRepository;
        _transactionRepository = transactionRepository;
    }
    
    public async Task<Category> GetCategoryByNameAsync(string name)
    {
        var category = await _categoryRepository.GetByNameAsync(name);

        if (category == null)
        {
            category = new Category
            {
                Name = name
            };

            _categoryRepository.Add(category);
            
            category = await _categoryRepository.GetByNameAsync(name);
        }

        return category;
    }

    public async Task<CategoryDto?> GetCategory(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        return category?.ToDto();
    }

    public async Task<Response<IEnumerable<CategoryDto>>> GetUserCategories(User user)
    {
        var categories = await _categoryRepository.GetUserCategories(user);

        return new Response<IEnumerable<CategoryDto>>
        {
            Value = categories
                .Select(category => category.ToDto())
                .DistinctBy(categoryDto => categoryDto.Name)
        };
    }

    public async Task<Response<IEnumerable<Spendings>>> GetSpendingsByCategory(User user)
    {
        var transactions = await _transactionRepository.GetAllUserTransactions(user);

        var spendings = transactions
            .GroupBy(transaction => transaction.Category)
            .Select(group => new Spendings
            {
                CategoryName = group.Key.Name,
                Amount = group.Sum(transaction => transaction.Value)
            })
            .ToList();
        return new Response<IEnumerable<Spendings>>
        {
            Value = spendings
        };
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategories()
    {
        var categories = await _categoryRepository.GetAllDataAsync();
        return categories.Select(category => category.ToDto()); 
    }
}