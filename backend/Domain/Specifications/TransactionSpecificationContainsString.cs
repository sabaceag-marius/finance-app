using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications;

public class TransactionSpecificationContainsString : Specification<Transaction>
{
    private readonly string _queryString;

    public TransactionSpecificationContainsString(string queryString)
    {
        _queryString = queryString;
    }
    public override Expression<Func<Transaction, bool>> Expr
        => transaction => transaction.Name.Contains(_queryString) || (transaction.Description != null && transaction.Description.Contains(_queryString));
}