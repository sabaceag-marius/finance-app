using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _dbContext;
        public CategoryRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Category>> GetAllDataAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _dbContext.Categories
                .FirstOrDefaultAsync(category => category.Id == id);
        }

        public async Task<Category?> GetByIdAsyncNoTracking(int id)
        {
            return await _dbContext.Categories.AsNoTracking()
                .FirstOrDefaultAsync(category => category.Id == id);
        }

        public Category? Add(Category category)
        {
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();

            return category;
        }

        public async Task<Category?> UpdateAsync(Category category)
        {
            _dbContext.Categories.Update(category);
            await _dbContext.SaveChangesAsync();
            return category;
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _dbContext.Categories.FindAsync(id);

            if (category == null) return;

            _dbContext.Categories.Remove(category);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _dbContext.Categories
                .FirstOrDefaultAsync(category => category.Name == name);
        }
    }
}