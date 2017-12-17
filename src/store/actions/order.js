/**  Action creators for submitting order **/


import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

// Redux thunk;
export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log("RES.DATA: ", response.data);
            console.log("Order Data: ");
            console.log(orderData);
            console.log("----------------");
            dispatch(purchaseBurgerSuccess(response.data, orderData))
        })
        .catch(error=> {
            dispatch(purchaseBurgerFailed(error));
        })
    }
}