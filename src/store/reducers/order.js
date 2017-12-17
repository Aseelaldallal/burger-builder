import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:

        case actionTypes.PURCHASE_BURGER_FAILED:

        default:
            return state;
    }
}

export default reducer;