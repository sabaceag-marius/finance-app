using AppServices.DTOs;
using AppServices.DTOs.Category;
using Domain.Entities;

namespace AppServices.Interfaces;

public interface ICategoryService
{
    public Task<Category> GetCategoryByNameAsync(string name);
    public Task<CategoryDto?> GetCategory(int id);
    public Task<Response<IEnumerable<CategoryDto>>> GetUserCategories(User user);
    public Task<Response<IEnumerable<Spendings>>> GetSpendingsByCategory(User user);
}