import React from 'react';
import classes from "./NavigationItems.css";
import navigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
    <ul classes={classes.NavigationItems}>
        <NavigationItem link="/" active> Burger Builder</NavigationItem>
        <NavigationItem link="/"> Checkout </NavigationItem>                
    </ul>
);

export default navigationItems;

