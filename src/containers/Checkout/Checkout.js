// REACT
import React, {Component} from 'react';
// CONTAINERS AND COMPONENTS
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// REACT ROUTER
import  {Route} from 'react-router-dom';
// REDUX
import {connect} from 'react-redux';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }

}


const mapPropsToState = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {

}

export default connect(mapPropsToState, mapDispatchToProps)(Checkout);