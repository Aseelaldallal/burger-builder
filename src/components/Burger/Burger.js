
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {


    let transformedIngredients = 
    Object.keys(props.ingredients)
          .reduce(function(accumulator, currentValue) {
             for(let i=0; i<props.ingredients[currentValue]; i++) {
                 accumulator.push(<BurgerIngredient key={currentValue + i} type={currentValue}/>);
             }
             return accumulator;
          }, []);

    
    if(transformedIngredients.length === 0) {
        transformedIngredients= <p>Please start adding Ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;