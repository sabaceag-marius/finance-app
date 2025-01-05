using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications;

public class TransactionSpecificationBeforeDate : Specification<Transaction>
{
    private readonly DateOnly _date;

    public TransactionSpecificationBeforeDate(DateOnly date)
    {
        _date = date;
    }
    public override Expression<Func<Transaction, bool>> Expr
        => (transaction) => (transaction.Date < _date);
}