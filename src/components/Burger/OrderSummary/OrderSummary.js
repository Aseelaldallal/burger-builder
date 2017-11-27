import React from 'react';
import Auxillary from '../../../hoc/Auxillary';


const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((currentValue)=> {
        return (<li key={currentValue}><span style={{textTransform: 'capitalize'}}>{currentValue}</span>: {props.ingredients[currentValue]}</li>);
    });

    return (
        <Auxillary>
            <h3>Your Order</h3>
            <p> A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxillary>
    )
}



export default orderSummary; 