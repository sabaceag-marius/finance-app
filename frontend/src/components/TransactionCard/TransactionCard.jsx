import React from "react";
import './TransactionCard.css';

function TransactionCard(props){

    const maxDescriptionLength = 60
    var description = props.transaction.description.length > maxDescriptionLength ? props.transaction.description.substring(0,maxDescriptionLength) + "... See more" : props.transaction.description; 

    return(

        <div className="transaction-card">
            <h3>{props.transaction.name} - {props.transaction.value}</h3>
            <div className="transaction-card-top">
                <div>{props.transaction.categoryName}</div>
                <div>{props.transaction.date}</div>
            </div>
            
            <p>{description.length != 0 ? description : <br></br>}</p>
            
        </div>

    )
}

export default TransactionCard;

