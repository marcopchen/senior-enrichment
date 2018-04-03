import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getProducts } from './store';
import Nav from './Nav';
import Home from './Home';
import Products from './Products';
import Category from './Category';

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getProducts();
  }

  render() {
    console.log(this);
    return (
      <Router>
        <div>
          <Route render={({ location }) => <Nav path={location.pathname} />} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/categories/:id" exact render={({ match, history }) => <Category id={match.params.id * 1} history={history} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    getProducts: () => dispatch(getProducts())
  };
};

export default connect(null, mapDispatchToProps)(App);
