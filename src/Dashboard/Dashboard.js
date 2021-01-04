import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import './Dashboard.scss';
import Overview from './Overview';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.location = window.location.pathname
        this.onClick = this.props.onClick;
    }
    

  render() {
    return (
      <div className="dashboard-main">
        <Router>  
          <Route path='/' exact component={Overview}/>
          <Route path='/overview' exact component={Overview}/>
        </Router>
      </div>
    );
  }
}

export default Dashboard;
