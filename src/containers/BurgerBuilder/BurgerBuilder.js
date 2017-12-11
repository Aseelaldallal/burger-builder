
import React, {Component} from 'react';
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// Global Const -- All Caps
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false, // When true, show spinner
        error: false
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('https://react-burger-builder-4b067.firebaseio.com/ingredients.json')
             .then(response => {
                this.setState({
                    loading: false,
                    ingredients: response.data
                });
             })
             .catch(error => {
                this.setState({
                    loading: false,
                    error: true
                })
             });
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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({ loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice, // Calculate on server in production, to make sure user isn't manipulating
        //     customer: {
        //         name: 'Aseel Al Dallal',
        //         address: {
        //             street: 'Test Street',
        //             zipCode: '41351',
        //             country: 'Canada'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //      .then(response => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false,
        //         });
        //      })
        //      .catch(error=> {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //      })
        const query = Object.entries(this.state.ingredients).map(([key, val]) => {
            return `${encodeURIComponent(key)}=${val}`;
        }).join("&");
        this.props.history.push({
            pathname:'/checkout' ,
            search: '?' + query }
        );
    }

    render() {
        const disabledInfo = {...this.state.ingredients }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        } 
        let orderSummary = null; 
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        if(this.state.ingredients) {
            burger = 
                ( <Auxillary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        price = {this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}/>
                </Auxillary>
                );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice.toFixed(2)}/>;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);