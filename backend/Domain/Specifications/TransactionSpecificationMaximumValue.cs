using Domain.Common.Specifications;
using System.Linq.Expressions;
using Domain.Entities;

namespace Domain.Specifications;

public class TransactionSpecificationMaximumValue : Specification<Transaction>
{
    private readonly decimal _value;

    public TransactionSpecificationMaximumValue(decimal value)
    {
        _value = value;
    }

    public override Expression<Func<Transaction, bool>> Expr
        => transaction => transaction.Value <= _value;
}