import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.id});
            return updateObject(state, {loading: false, orders: state.orders.concat(newOrder), purchased: true})
        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false});
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true});
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false});
        case actionTypes.FETCH_ORDERS_START: 
            return updateObject(state, { loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS: 
            return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAILED: 
            return updateObject(state, { loading: false});
        default:
            return state;
    }
}

const fetchOrdersSuccess = (state,action) => {
    const sortedOrders = action.orders.sort(sortByDateDesc);
    return updateObject(state, { orders: sortedOrders, loading: false});
}

const sortByDateDesc = function (lhs, rhs) {
    return lhs.date < rhs.date ? 1 : lhs.date > rhs.date ? -1 : 0;
}

export default reducer;