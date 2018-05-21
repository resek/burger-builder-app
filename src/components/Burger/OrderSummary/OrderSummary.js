import React, {Fragment} from 'react';
import Button from "../../UI/Button/Button";

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
            <p><strong>Price: {props.totalPrice.toFixed(2)}€</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
}

export default orderSummary;