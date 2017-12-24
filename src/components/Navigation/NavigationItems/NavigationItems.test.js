
// Enzyme allows us to render NavigationItem without having to render the entire app
// shallow function: it renders the component with all its content, but the content isn't deeply
// rendered. I.e, NavigationItems has NavigationItem, but NavigationItem is "shallow"

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';

configure({adapter: new Adapter()});


describe('<Navigation />', ()=> {
    
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    })

    it('should render two <NavigationItem/> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render logout NavigationItem if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout"> Logout </NavigationItem> )).toEqual(true);
    });

});
