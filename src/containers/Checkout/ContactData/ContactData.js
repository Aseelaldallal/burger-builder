

import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                touched: false
            }, 
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false
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
                    minLength: 6,
                    maxLength: 6
                }, 
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false
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
        loading: false,
        formIsValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = (value.trim() !=='') && isValid;
        }
        if(rules.minLength) {
            isValid = (value.replace(/ /g,'').length >= rules.minLength) && isValid;
        }
        if(rules.maxLength) {
            isValid = (value.replace(/ /g,'').length <= rules.maxLength) && isValid;
        }
        return isValid;
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log(updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
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
        this.setState({ loading: true});
        const formData = {}
        for(let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        console.log(formData);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // Calculate on server in production, to make sure user isn't manipulating
            orderData: formData
        }
        axios.post('/orders.json', order)
             .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
             })
             .catch(error=> {
                this.setState({loading: false});
             })
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
                       changed={(event) => this.inputChangedHandler(event, element[0])}/>
            );
        })
        let form = (
            <form onSubmit={this.orderHandler}> 
                {formElements}
                <Button btnType="Success" disabled={!this.state.formIsValid}> ORDER </Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter Your Contact Data </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;