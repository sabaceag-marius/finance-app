import React from "react";
import './TransactionCard.css';
import {Link, Navigate} from "react-router";

function TransactionCard({transaction}){

    const maxDescriptionLength = 60
    // var description = props.transaction.description.length > maxDescriptionLength ? props.transaction.description.substring(0,maxDescriptionLength) + "... See more" : props.transaction.description;

    return(

        <Link to={`/transactions/${transaction.id}`} className="transaction-card">
            <h3>{transaction.name} - {transaction.value}</h3>
            <div className="transaction-card-top">
                <div>{transaction.categoryName}</div>
                <div>{transaction.date}</div>
            </div>
            
            {/*<p>{description.length != 0 ? description : <br></br>}</p>*/}
            
        </Link>

    )
}

export default TransactionCard;

