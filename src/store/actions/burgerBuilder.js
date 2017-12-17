import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredient
    }
}




// Load ingredients from db
// This syntax is available due to redux-thunk
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-4b067.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    };
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// This is the synchronous action I want to dispatch when the asynchronous code in initIngredients is done
const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}