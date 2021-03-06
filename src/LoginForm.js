import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
import Spinner from './spinner';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false,
      loggingIn: false
    }
  }

  setInputValue(property, val) {
    val = val.trim();
    console.log(val)
    if (val.length > 50) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      //username: '',
      password: '',
      buttonDisabled: false,
    })
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }

    this.setState({
      buttonDisabled: true,
      loggingIn: true
    })

    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await res.json();
      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg)
      }
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
    finally {
      this.setState({
        loggingIn: false
      })
    }
  }

  checkEnter(e) {
    if (e.key == 'Enter') {
      this.doLogin()
    }
    else {
    }
    return;
  }

  render() {
    return (
      <div className="loginForm">
        <InputField
          type='email'
          id='email'
          name='email'
          placeholder='Your Username'
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username', val)}
          onKeyPress={(e) => { return }}
        />

        <InputField
          type='password'
          id='password'
          name='password'
          placeholder='Your Password'
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val)}
          onKeyPress={(e) => this.checkEnter(e)}
        />

        <input type="checkbox" id="remember" class="checkbox" checked />
        <label for="remember">Remember me</label>

        <SubmitButton
          text='Sign In'
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />

        <a href="#" class="more">Forgot your password?</a>

        <Spinner
          loading={this.state.loggingIn} color="#022ea8"
        />
      </div>
    );
  }
}

export default LoginForm;
