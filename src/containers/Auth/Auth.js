import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

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
        registerMode: false
    }


    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.setAuthRedirectPath();
        }
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.registerMode);
    }

    swithAuthModeHandler = () => {
        this.props.clearAuthError();
        // const clearedEmail = updateObject(this.state.controls.email, {value: '', valid: false, touched: false});
        // const clearedPassword = updateObject(this.state.controls.password, {value: '', valid: false, touched: false});
        // const updatedControls = updateObject(this.state.controls, { email: clearedEmail, password: clearedPassword});
        this.setState(prevState=> {
            return {
                registerMode: !prevState.registerMode
            }
        })
    }

    getErrorMessage(error) {
        switch(error.message) {
            case("EMAIL_EXISTS"): return "This email address is already in use by another account";
            case("TOO_MANY_ATTEMPTS_TRY_LATER"): return "Too many attempts! Try again later";
            case("EMAIL_NOT_FOUND"): return "Unrecognized email address. Did you register?";
            case("INVALID_PASSWORD"): return "Eeek... Wrong password";
            case("MISSING_PASSWORD"): return "You must enter a password";
            case("INVALID_EMAIL"): return "Please enter a valid email address";
            case("WEAK_PASSWORD : Password should be at least 6 characters"): return "Weak Password. Password must be at least 6 characters long";
            default: return error.message;
        }
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
            errorMessage = <p className={classes.errorMsg}>{this.getErrorMessage(this.props.error)}</p>;
        }
        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        const title = this.state.registerMode ? 'REGISTER' : 'SIGN IN';
        const signInMsg = 'Already have an account?';
        const registerMsg = "Don't have an account?";
        const msg = this.state.registerMode ? signInMsg : registerMsg;
        return (
            <div className={classes.Auth}>
                <div className={classes.title}> {title} </div>
                {authRedirect}
                <div className={classes.content}>
                    {errorMessage}
                    {form}
                    <hr/>
                    <p className={classes.msg}>{msg}</p>
                    <Button 
                        clicked={this.swithAuthModeHandler}
                        btnType="Danger"> {!this.state.registerMode ? 'REGISTER' : 'SIGN IN'}</Button>
                </div>
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
        setAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/')),
        clearAuthError: ()=>dispatch(actions.clearAuthError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);