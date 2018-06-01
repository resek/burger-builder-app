import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios.orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get("https://burger-builder-react-app-d211b.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseState(newIngredients) {
        
        const sum = Object.keys(newIngredients).map(igKey => {
            return newIngredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0)

        this.setState({purchasable: sum > 0});
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
        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = updatedCount;
        const newtotalPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
        this.setState({ingredients: newIngredients, totalPrice: newtotalPrice});
        this.updatePurchaseState(newIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Donsan",
                address: {
                    street: "Test street 10",
                    ZIP: "12345",
                    country: "Spain",
                },
                email: "test@test.com",      
            },
            deliveryMethod: "fastest",           
        }

        //baseURL created with axios instances + /orders = DB node/collections; .json firebase specific
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false, purchasing: false});  
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //{salad: true, bacon: false, ... }

        let orderSummary = null;    
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />

        if(this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice} 
                        purchasable={this.state.purchasable} 
                        ordered={this.purchaseHandler} />
                </Fragment>
            );

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCancelled={this.purchaseCancelHandler} 
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }        

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);