import {BurgerBuilder} from './BurgerBuilder';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});


describe('<BurgerBuilder />', ()=> {
    
   let wrapper;

   beforeEach(()=> {
       wrapper = shallow(<BurgerBuilder totalPrice={5} initIngredients={()=> {}}/>);
   });

   it('should render <BuildControls /> when recieving ingredients',()=> {
       wrapper.setProps({ingredients: {salad: 0}});
       expect(wrapper.find(BuildControls)).toHaveLength(1);
   });

});
