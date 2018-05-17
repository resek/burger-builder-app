import React, {Fragment} from 'react';

const orderSummary = (props) => {
   
    const ingredientsSummary = Object.keys(props.ingredients).map(ingKey => {
        return <li key={ingKey}><span style={{textTransform: "capitalize"}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
    });
    
    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with following ingredinets:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Fragment>
    );
}

export default orderSummary;