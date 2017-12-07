import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../../hoc/Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        // Not causing side effects here
        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null}); // clear error
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return(
                <Auxillary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            );
        }
    }
        
}

export default withErrorHandler;

