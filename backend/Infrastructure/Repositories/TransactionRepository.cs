using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Common.Specifications;
using Domain.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _dbContext;
        public TransactionRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Transaction? Add(Transaction transaction)
        {
            _dbContext.Add(transaction);
            
            _dbContext.SaveChanges();

            return transaction;
        }

        public async Task DeleteAsync(int id)
        {
            var transaction = await _dbContext.Transactions.FindAsync(id);

            if (transaction == null) return;

            _dbContext.Transactions.Remove(transaction);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<Transaction?> UpdateAsync(Transaction transaction)
        {
           _dbContext.Transactions.Update(transaction);
           await _dbContext.SaveChangesAsync();

           return transaction;
        }

        public async Task<Transaction?> GetByIdAsync(int id)
        {
            return await _dbContext.Transactions
                .Include(transaction => transaction.Category)
                .FirstOrDefaultAsync(transaction => transaction.Id == id);
        }
        
        public async Task<Transaction?> GetByIdAsyncNoTracking(int id)
        {
            return await _dbContext.Transactions.AsNoTracking()
            .Include(transaction => transaction.Category)
            .FirstOrDefaultAsync(transaction => transaction.Id == id);
        }

        public async Task<IEnumerable<Transaction>> GetAllDataAsync()
        {
            return await _dbContext.Transactions
                .Include(transaction => transaction.Category)
                .ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetPaginatedDataWithSpecificationAsync(
            Specification<Transaction> specification, int pageNumber, int pageSize)
        {
            var skipNumber = (pageNumber - 1) * pageSize;
            
            return await _dbContext.Transactions
                .Include(transaction => transaction.Category)
                .Where(specification.Expr) // filtering
                .Skip(skipNumber).Take(pageSize) // pagination
                .ToListAsync();
        }
    }
}