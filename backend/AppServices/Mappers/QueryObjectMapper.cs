using AppServices.DTOs;
using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Specifications;

namespace AppServices.Mappers;

public static class QueryObjectMapper
{
    public static Specification<Transaction> ToSpecification(this QueryObject queryObject)
    {
        Specification<Transaction> specification = new AnySpecification<Transaction>();
        
        if (queryObject.CategoryNamesList != null)
        {
            var specifications = queryObject.CategoryNamesList.Select(x => (Specification<Transaction>)
                new TransactionSpecificationCategory(x)).ToList();

            specification = specification.And(specifications.CombineListOr());
        }
        
        if (queryObject.MinimumValue != null)
        {
            specification = specification.And(new TransactionSpecificationMinimumValue((decimal)queryObject.MinimumValue));
        }

        if (queryObject.MaximumValue != null)
        {
            specification = specification.And(new TransactionSpecificationMaximumValue((decimal)queryObject.MaximumValue));
        }

        return specification;
    } 
}