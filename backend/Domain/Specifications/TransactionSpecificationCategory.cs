using System.Linq.Expressions;
using Domain.Common.Specifications;
using Domain.Entities;

namespace Domain.Specifications;

public class TransactionSpecificationCategory : Specification<Transaction>
{
    public TransactionSpecificationCategory(string name)
    {
        _categoryName = name;
    }

    private readonly string _categoryName;

    public override Expression<Func<Transaction, bool>> Expr 
        => (transaction) => (transaction.Category.Name == _categoryName);
}