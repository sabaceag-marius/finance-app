using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications;

public class TransactionSpecificationAfterDate : Specification<Transaction>
{
    private readonly DateOnly _date;

    public TransactionSpecificationAfterDate(DateOnly date)
    {
        _date = date;
    }
    
    public override Expression<Func<Transaction, bool>> Expr
        => (transaction) => (transaction.Date > _date);
}