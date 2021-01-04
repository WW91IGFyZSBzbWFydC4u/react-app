import React from 'react';
import {observer} from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import Spinner from './spinner';
import './App.scss';
import Dashboard from './Dashboard/Dashboard';
import Navbar from './Dashboard/Navbar';
import TitleBar from './TitleBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Overview from './Dashboard/Overview';
import Wallet from './Dashboard/Wallet';
import Profile from './Dashboard/AppProfile';
import AppProfile from './Dashboard/AppProfile';
import {Alert} from 'tabler-react'

class App extends React.Component{
  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'applcication/json',
          'Content-Type': 'applcication/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    catch(e){
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
    
  }

  async doLogout() {

    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'applcication/json',
          'Content-Type': 'applcication/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    }
    catch(e){
      console.log(e)
    }
    
  }

  render(){

    if(UserStore.loading) {
      return (
        <div className="app">
          <div className='loginContainer'> 
            Loading, please wait...
            <Spinner
            loading={true}
          />
          </div>
        </div>
      );  
    }

    else {
      // HERE YOU 
      if (UserStore.isLoggedIn ) {
        return (
          <div className="all">
            <div className="content" id="dashboard-content">
              <div className="titlebar">
                <TitleBar/>
              </div>
              <Router>
                <div className="navbar">
                    <Navbar
                      onClick = {() => this.doLogout()}
                    />
                </div>
                <Route path='/' exact component={Overview}/>
                <Route path='/overview' exact component={Overview}/>
                <Route path='/wallet' exact component={Wallet}/>
                <Route path='/profile' exact component={AppProfile}/>
              </Router>
              <div className="footer">
                <Alert type="danger" icon="alert-triangle">
                  2FA Authentication is currently disabled - we are working on a solution!
                </Alert>
              </div>
            </div>
          </div>
        );  
      }

      return (
        <div className="app">
          <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
              <article class="half">
					      <h1>CryptoWallet</h1>
					      <h2>beta</h2>
			          <div class="tabs">
				          <span class="tab signin active"><a href="#signin">Sign in</a></span>
			          </div>
			        <div class="content">
				            <div class="signin-cont cont">
                      <LoginForm/>
    				        </div>
			        </div>
		         </article>
             <div class="half bg"></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
