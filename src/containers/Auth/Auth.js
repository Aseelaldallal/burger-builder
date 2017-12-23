import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                }, 
                valid: false,
                touched: false
            }, 
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                }, 
                valid: false,
                touched: false
            } 
        },
        registerMode: true
    }


    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.setAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if(rules.required) {
            isValid = (value.trim() !=='') && isValid;
        }
        if(rules.minLength) {
            isValid = (value.replace(/ /g,'').length >= rules.minLength) && isValid;
        }
        if(rules.maxLength) {
            isValid = (value.replace(/ /g,'').length <= rules.maxLength) && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.registerMode);
    }

    swithAuthModeHandler = () => {
        this.setState(prevState=> {
            return {
                registerMode: !prevState.registerMode
            }
        })
    }

    render() {
        const formElements = Object.entries(this.state.controls).map(element => {
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
        });
        let form = (
            <form onSubmit={this.submitHandler}> 
                {formElements}
                <Button btnType="Success"> SUBMIT </Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />;
        }
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }
        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button 
                    clicked={this.swithAuthModeHandler}
                    btnType="Danger"> SWITCH TO {this.state.registerMode ? 'SIGN IN' : 'REGISTER'}</Button>
            </div>
        );
    };

}

export const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: (state.auth.token !== null),
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, registerMode) => dispatch(actions.auth(email,password, registerMode)),
        setAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);