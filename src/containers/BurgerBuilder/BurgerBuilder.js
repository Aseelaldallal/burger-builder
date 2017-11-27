
import React, {Component} from 'react';
import Auxillary from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// Global Const -- All Caps
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatePurchaseState = (ingredients) => {
        let sum = Object.keys(ingredients).reduce((accumulator, currentValue) => {
            return accumulator += ingredients[currentValue];
        }, 0)
        this.setState({ purchaseable: sum> 0});
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] > 0) {
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = this.state.ingredients[type] - 1;
            const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    render() {
        const disabledInfo = {...this.state.ingredients }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        } 
        return(
            <Auxillary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price = {this.state.totalPrice}
                    disabled={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchaseable={this.state.purchaseable}
                />
            </Auxillary>
        );
    }
}

export default BurgerBuilder;