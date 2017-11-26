
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {


    const transformedIngredients = 
    Object.keys(props.ingredients)
          .reduce(function(accumulator, currentValue) {
             for(let i=0; i<props.ingredients[currentValue]; i++) {
                 accumulator.push(<BurgerIngredient key={currentValue + i} type={currentValue}/>);
             }
             return accumulator;
          }, []);


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;