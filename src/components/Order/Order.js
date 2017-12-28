



import React from 'react';
import classes from './Order.css';
import moment from 'moment';

const order = (props) => {
    
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <li key={ig.name}>{ig.name}: {ig.amount} </li>;
    })

    return(
        <div className={classes.Order}>
            <p> <strong>Order Date:  </strong>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')} </p>
            <p> <strong>Ingredients: </strong> </p><ul>{ingredientOutput}</ul>
            <p> <strong>Price:  </strong> {props.price.toFixed(2)}</p>
        </div>
    );
}

export default order;