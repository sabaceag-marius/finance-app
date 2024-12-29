using AppServices.DTOs;
using AppServices.DTOs.Transaction;
using Domain.Entities;

namespace AppServices.Interfaces;

public interface ITransactionService
{
    public Task<Response<TransactionDto>> AddTransaction(CreateTransactionRequestDto requestDto, User user);

    public Task<Response<TransactionDto>> UpdateTransaction(int id, UpdateTransactionRequestDto requestDto, User user);

    public Task<Response> DeleteTransaction(int id, User user);
    
    public Task<Response<TransactionDto>> GetTransaction(int id, User user);

    public Task<Response<IEnumerable<TransactionDto>>> GetAllTransactions();

    public Task<Response<IEnumerable<TransactionDto>>> QueryTransactions(QueryObject query, User user);

    public Task<Response<int>> GetFilteredTransactionsCountAsync(QueryObject query, User user);

}