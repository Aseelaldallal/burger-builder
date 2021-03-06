// React
import React, {Component} from 'react';
// Components and Containers
import Order from '../../components/Order/Order';
import Modal from '../../components/UI/Modal/Modal';
// Axios
import axios from '../../axios-orders';
// HOC
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
// UI
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    closeModal = () => {
        this.props.purchaseReset();
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (
                    <Order date={order.date}
                           key={order.id}
                           ingredients={order.ingredients}
                           price={+order.price} />
                );
            });
        }
        let modal = null;
        if(this.props.purchased) {
            modal = (
                <Modal show modalClosed={this.closeModal}>
                    <p style={{
                        textAlign: 'center',
                        color: '#5C9210',
                        fontWeight: 'bold'
                    }}> We just placed your order! </p>
                </Modal>
            )
        }
        return(       
            <div>
                {modal}
                {orders}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        purchased: state.order.purchased
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        purchaseReset: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));