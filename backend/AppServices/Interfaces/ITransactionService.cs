using AppServices.DTOs;
using AppServices.DTOs.Transaction;

namespace AppServices.Interfaces;

public interface ITransactionService
{
    public Task<Response<TransactionDto>> AddTransaction(CreateTransactionRequestDto requestDto);

    public Task<Response<TransactionDto>> UpdateTransaction(int id, UpdateTransactionRequestDto requestDto);

    public Task<Response> DeleteTransaction(int id);
    
    public Task<Response<TransactionDto>> GetTransaction(int id);

    public Task<Response<IEnumerable<TransactionDto>>> GetAllTransactions();

    public Task<Response<IEnumerable<TransactionDto>>> QueryTransactions(QueryObject query);
}