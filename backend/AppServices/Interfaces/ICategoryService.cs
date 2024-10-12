using AppServices.DTOs.Category;
using Domain.Entities;

namespace AppServices.Interfaces;

public interface ICategoryService
{
    public Task<Category> GetCategoryByNameAsync(string name);
    public Task<CategoryDto?> GetCategory(int id);
    public Task<IEnumerable<CategoryDto>> GetAllCategories();
}