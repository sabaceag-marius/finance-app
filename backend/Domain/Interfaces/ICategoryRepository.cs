using Domain.Entities;

namespace Domain.Interfaces;

public interface ICategoryRepository : IRepository<Category, int>
{
    public Task<Category?> GetByNameAsync(string name);

}