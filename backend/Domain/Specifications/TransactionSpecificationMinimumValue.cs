using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications;

public class TransactionSpecificationMinimumValue : Specification<Transaction>
{
    private readonly decimal _value;

    public TransactionSpecificationMinimumValue(decimal value)
    {
        _value = value;
    }

    public override Expression<Func<Transaction, bool>> Expr
        => transaction => transaction.Value >= _value;
}