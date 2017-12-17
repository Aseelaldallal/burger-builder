// REACT
import React, {Component} from 'react';
// COMPONENTS AND CONTAINERS
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
// AXIOS
import axios from '../../axios-orders';
// HOC
import Auxillary from "../../hoc/Auxillary/Auxillary";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// REDUX
import * as actions from '../../store/actions/'; // it automatically points to index.js
import { connect } from 'react-redux';




class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    getPurchaseState = (ingredients) => {
        let sum = Object.keys(ingredients).reduce((accumulator, currentValue) => {
            return accumulator += ingredients[currentValue];
        }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ingredients }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        } 
        let orderSummary = null; 
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        if(this.props.ingredients) {
            burger = 
                ( <Auxillary>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        price = {this.props.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        purchaseable={this.getPurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}/>
                </Auxillary>
                );
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice.toFixed(2)}/>;
        }
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient)=> dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient)=> dispatch(actions.removeIngredient(ingredient)),
        initIngredients: ()=>dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));