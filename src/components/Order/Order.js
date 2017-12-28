



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
        return <span 
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block', 
                    margin: '0 8px',
                    border: '1px solid gray',
                    padding: '5px'
                }}>{ig.name} ({ig.amount}) </span>
    })
    return(
        <div className={classes.Order}>
            <p> Date: {moment(props.date).format('MMMM Do YYYY, h:mm:ss a')} </p>
            <p> Ingredients: {ingredientOutput}</p>
            <p> Price: <strong> {props.price.toFixed(2)} </strong></p>
        </div>
    );
}

export default order;