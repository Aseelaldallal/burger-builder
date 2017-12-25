import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false,
                validationMessage: 'Name cannot be blank'
            }, 
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false,
                validationMessage: 'We need your address to deliver the burger!'
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    isCanadianPostalCode: true
                }, 
                valid: false,
                touched: false,
                validationMessage: 'Please enter a valid Canadian Postal Code - Format: X0X 0X0'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                }, 
                valid: false,
                touched: false,
                validationMessage: 'Please enter a valid email address'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:  {
                    options: [
                        {displayName: 'Fastest', value: 'fastest'},
                        {displayName: 'Cheapest', value: 'cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

   
    inputChangedHandler = (event, inputIdentifier) => {      
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value:event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })




    }

    orderHandler = (event) => {
        event.preventDefault(); 
        const formData = {}
        for(let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2), // Calculate on server in production, to make sure user isn't manipulating
            orderData: formData,
            userId: this.props.userId
        }
       this.props.orderBurger(order, this.props.token);
    }

    render() {
        const formElements = Object.entries(this.state.orderForm).map(element => {
            return (
                <Input key={element[0]} 
                       elementType={element[1].elementType} 
                       elementConfig={element[1].elementConfig}
                       value={element[1].value} 
                       invalid={!element[1].valid}
                       shouldValidate={element[1].validation}
                       touched={element[1].touched}
                       changed={(event) => this.inputChangedHandler(event, element[0])}
                       validationMsg={element[1].validationMessage}/>
            );
        })
        let form = (
            <form onSubmit={this.orderHandler}> 
                {formElements}
                <Button btnType="Success" disabled={!this.state.formIsValid}> ORDER </Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));