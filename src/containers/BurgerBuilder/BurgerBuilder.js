// REACT
import React, {Component} from 'react';
// COMPONENTS AND CONTAINERS
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
// HOC
import Auxillary from "../../hoc/Auxillary/Auxillary";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// AXIOS
import axios from '../../axios-orders';
// REDUX
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';


// Global Const -- All Caps
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false, // When true, show spinner
        error: false
    }

    componentDidMount() {
        // this.setState({loading: true});
        // axios.get('https://react-burger-builder-4b067.firebaseio.com/ingredients.json')
        //      .then(response => {
        //         this.setState({
        //             loading: false,
        //             ingredients: response.data
        //         });
        //      })
        //      .catch(error => {
        //         this.setState({
        //             loading: false,
        //             error: true
        //         })
        //      });
    }

    updatePurchaseState = (ingredients) => {
        let sum = Object.keys(ingredients).reduce((accumulator, currentValue) => {
            return accumulator += ingredients[currentValue];
        }, 0)
        this.setState({ purchaseable: sum> 0});
    }

    // addIngredientHandler = (type) => {
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = this.state.ingredients[type] + 1;
    //     const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     });
    //     console.log(updatedIngredients);
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     if(this.state.ingredients[type] > 0) {
    //         const updatedIngredients = {...this.state.ingredients};
    //         updatedIngredients[type] = this.state.ingredients[type] - 1;
    //         const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //         this.setState({
    //             ingredients: updatedIngredients,
    //             totalPrice: updatedPrice
    //         });
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        let query = Object.entries(this.props.ingredients).map(([key, val]) => {
            return `${encodeURIComponent(key)}=${val}`;
        }).join("&");
        query += "&price=" + this.props.totalPrice.toFixed(2);
        this.props.history.push({
            pathname:'/checkout' ,
            search: '?' + query}
        );
    }

    render() {
        const disabledInfo = {...this.props.ingredients }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        } 
        let orderSummary = null; 
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        if(this.props.ingredients) {
            burger = 
                ( <Auxillary>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        price = {this.props.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}/>
                </Auxillary>
                );
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice.toFixed(2)}/>;
        }
        // if(this.state.loading) {
        //     orderSummary = <Spinner />
        // }
        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient)=> dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
        removeIngredient: (ingredient)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));