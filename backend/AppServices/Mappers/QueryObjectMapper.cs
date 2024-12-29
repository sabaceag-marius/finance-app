using AppServices.DTOs;
using Domain.Common.Specifications;
using Domain.Entities;
using Domain.Specifications;
using Microsoft.IdentityModel.Tokens;

namespace AppServices.Mappers;

public static class QueryObjectMapper
{
    public static Specification<Transaction> ToSpecification(this QueryObject queryObject)
    {
        Specification<Transaction> specification = new AnySpecification<Transaction>();

        if (!queryObject.SearchString.IsNullOrEmpty())
        {
            specification = specification.And(new TransactionSpecificationContainsString(queryObject.SearchString!));
        }
        
        if (!queryObject.CategoryName.IsNullOrEmpty())
        {
            specification = specification.And(new TransactionSpecificationCategory(queryObject.CategoryName));
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