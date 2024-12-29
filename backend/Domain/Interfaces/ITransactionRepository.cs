using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Interfaces;


public interface ITransactionRepository : IRepository<Transaction, int>
{
    public Task<IEnumerable<Transaction>> GetFilteredTransactionsAsync(Specification<Transaction> filters,
        int pageNumber, int pageSize, User user);

    public Task<IEnumerable<Transaction>> GetAllUserTransactions(User user);

    public Task<int> GetFilteredTransactionsCountAsync(Specification<Transaction> filters, User user);

}