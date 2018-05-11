import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        // TO UNDERSTAND LOGIC
        // console.log(igKey);
        // console.log(props.ingredients[igKey]);
        // console.log([...Array(props.ingredients[igKey])]);
        // [...Array(props.ingredients[igKey])].map((_, i) => {
        // console.log(i);    
        // });
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    });

    console.log(transformedIngredients);
 
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;