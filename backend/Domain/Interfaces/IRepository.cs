
namespace Domain.Interfaces;

public interface IRepository<T,TKey>
{
    public Task<IEnumerable<T>> GetAllDataAsync();
    public Task<T?> GetByIdAsync(TKey id);
    public Task<T?> GetByIdAsyncNoTracking(TKey id);
    public T? Add(T t);
    public Task<T?> UpdateAsync(T t);
    public Task DeleteAsync(T t);
}