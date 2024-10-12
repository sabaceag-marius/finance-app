using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Interfaces;


public interface ITransactionRepository : IRepository<Transaction, int>
{
    public Task<IEnumerable<Transaction>> GetPaginatedDataWithSpecificationAsync(
        Specification<Transaction> specification, int pageNumber, int pageSize);
}