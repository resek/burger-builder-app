import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 2,
            bacon: 1,
            cheese: 2,
            meat: 1,
        },
        totalPrice: 4 
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = updatedCount;
        const newtotalPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
        this.setState({ingredients: newIngredients, totalPrice: newtotalPrice});
    }

    render () {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} />
            </Fragment>
        )
    }
}

export default BurgerBuilder;