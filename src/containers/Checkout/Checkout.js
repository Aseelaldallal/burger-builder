// REACT
import React, {Component} from 'react';
// CONTAINERS AND COMPONENTS
import ContactData from './ContactData/ContactData';
import Burger from '../../components/Burger/Burger';
// REACT ROUTER
import  {Redirect} from 'react-router-dom';
// REDUX
import {connect} from 'react-redux';
// CSS
import classes from './Checkout.css';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {

        const burgerBox ={
            width: '500px',
        }

        const contactBox ={
            width: '500px',
        }

        let summary = <Redirect to="/" />

        if(this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/orders" /> : null;
            summary = (
                <div className={classes.Checkout}>
                    {purchasedRedirect}
                    <h1>We hope it tastes great!</h1>
                    <hr/>
                    <div className={classes.Container}>
                        <div style={burgerBox}>
                            <h2> Your Burger </h2>
                            <Burger ingredients={this.props.ingredients} />
                        </div>
                        <div style={contactBox}>
                            <h2> Your Details </h2>
                            <ContactData />
                        </div>
                    </div>
                </div>
            )
        }
        return summary;
    }

}

const mapPropsToState = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapPropsToState)(Checkout);