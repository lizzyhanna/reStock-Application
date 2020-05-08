//This is the base of our app. It directs traffic through the multiple routes on the site.

import React, {Component} from 'react';
import './App.css';
import {DepartmentsDashboard} from './DepartmentsDashboard';
import {Login} from './Login';
import {SalesList} from './SalesList';
import {ForgotPassword} from './ForgotPassword';
import {Home} from './Home';
import { ProductsDashboard } from './ProductsDashboard';
import { ProductDisplay } from './ProductDisplay';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ItemEditorDashboard } from './ItemEditorDashboard';
import { SalesDashboard } from './SalesDashboard';
import { EmployeeEditor } from './EmployeeEditor';
import { InfoEditor } from './InfoEditor';

class App extends Component{
  render(){
    return (
      <Router>
            {/*alias*/}
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/addItem" component={ItemEditorDashboard}/>
              <Route exact path='/ForgotPassword' component={ ForgotPassword } /> 
              <Route path="/Home" component={Home}/>
              <Route exact path="/ProductsList" component={ ProductsDashboard }/>  
              <Route exact path="/Departments" component={DepartmentsDashboard}/>
              <Route exact path="/Products/:id" component={ ProductDisplay }/>
              <Route exact path="/Sales" component={SalesDashboard}/>
              <Route exact path="/addEmployee" component={EmployeeEditor}/>
              <Route exact path="/editEmployee" component={InfoEditor}/>

            </Switch>
          </Router>
    );
  }
}

export default App;
