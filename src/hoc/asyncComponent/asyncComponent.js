import React, {Component} from 'react';

// Takes a function as input then executes it
const asyncComponent = (importComponent) => {

  return class extends Component {
  
    state = { component: null }
    
    componentDidMount() {
      importComponent()
        .then(cmp=> {
          this.setState({component: cmp.default});
         });
    }
    
    render() {
        const C = this.state.component;
        return C? <C {...this.props} /> : null;
    }

  }

}

export default asyncComponent;