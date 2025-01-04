using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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

        public async Task DeleteAsync(Category category)
        {
            _dbContext.Categories.Remove(category);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _dbContext.Categories
                .FirstOrDefaultAsync(category => category.Name == name);
        }

        public async Task<IEnumerable<Category>> GetUserCategories(User user)
        {
            return (await _dbContext.Transactions
                .Include(transaction => transaction.Category)
                .Where(transaction => transaction.UserId == user.Id)
                .Select(transaction => transaction.Category)
                .ToListAsync())!;
        }

    }
}