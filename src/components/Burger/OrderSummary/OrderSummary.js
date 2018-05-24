import React, {Component, Fragment} from 'react';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    
    //This could be a functional component, does not need to be a class.
    componentDidUpdate() {
        console.log("from Ordersummary component");
    }

    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients).map(ingKey => {
            return <li key={ingKey}><span style={{textTransform: "capitalize"}}>{ingKey}</span>: {this.props.ingredients[ingKey]}</li>
        });
        
        return (
            <Fragment>
                <h3>Your order</h3>
                <p>A delicious burger with following ingredinets:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Price: {this.props.totalPrice.toFixed(2)}€</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Fragment>
        );
    }
}

export default OrderSummary;