import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'grommet/components/App';

import About from '../screens/About';
import VendorAdminPanel from '../screens/VendorAdminPanel';
import CarBarAdmin from '../screens/CarBarAdmin';
import Landing from '../screens/Landing';
import Login from '../screens/Login';
import NotFound from '../screens/NotFound';
import VendorSignUp from '../screens/VendorSignUp';

class Main extends Component {
  render() {
    return (
      <App centered={false}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={Landing} />
            <Route path='/about' component={About} />
            <Route path='/vendorAdmin' component={VendorAdminPanel} />
            <Route path='/carBarAdmin' component={CarBarAdmin} />
            <Route path='/landing' component={Landing} />
            <Route path='/login' component={Login} />
            <Route path='/vendorsignup' component={VendorSignUp} />
            <Route path='/*' component={NotFound} />
          </Switch>
        </Router>
      </App>
    );
  }
}

const select = () => ({
});

export default connect(select)(Main);
