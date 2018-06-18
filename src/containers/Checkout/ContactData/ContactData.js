import React, {Component} from "react";
import axios from "../../../axios.orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";

class ContactData extends Component {

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        console.log(order);

        //baseURL created with axios instances + /orders = DB node/collections; .json firebase specific
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push("/");  
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )

    }
}

export default ContactData;