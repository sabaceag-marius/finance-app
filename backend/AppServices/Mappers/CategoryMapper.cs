using AppServices.DTOs.Category;
using Domain.Entities;

namespace AppServices.Mappers;

public static class CategoryMapper
{
    public static CategoryDto ToDto(this Category category)
    {
        return new CategoryDto
        {
            // Id = category.Id,
            Name = category.Name
        };
    }

    public static Category ToCategory(this CategoryDto categoryDto)
    {
        return new Category
        {
            Name = categoryDto.Name
        };
    }
}