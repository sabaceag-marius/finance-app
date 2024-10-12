using AppServices.DTOs.Category;
using AppServices.Interfaces;
using AppServices.Mappers;
using Domain.Entities;
using Domain.Interfaces;

namespace AppServices.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
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

    public async Task<IEnumerable<CategoryDto>> GetAllCategories()
    {
        var categories = await _categoryRepository.GetAllDataAsync();
        return categories.Select(category => category.ToDto()); 
    }
}