import React, {Component} from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

    state = {
        ingredients: {}
    }

    componentDidMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        console.log(query);
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }   

    checkoutCancled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    checkoutContinued={this.checkoutContinued}
                    checkoutCancled={this.checkoutCancled}
                    ingredients={this.state.ingredients} />
            </div>
        );
    }    
}

export default Checkout;