import React, { Component } from 'react';

import { Input, Checkbox, Button, Container, Grid, Image } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { loginAPI } from '../../api/login.js';
import './login.css'
import { COOKIE_EXPIRE_DAYS, SESSION_EXPIRE_DAYS, getCookie, verifyAuth } from '../../utils.js';


class Login extends Component {

  constructor() {
    super();
      this.state = {
        pwd: '',
        email: '',
        emailError: false,
        pwdError: false,
        checkbox: false,
        loading: false,
        showErrorMessage: false,
        errorMessage: '',
        showComponent: false,
    };
  };

  componentWillMount() {
    if (verifyAuth()) {
      window.location = `${window.location.origin}/homepage/`;
    } else {
      this.setState({ showComponent: true });
      document.body.style.backgroundColor = '#6ebc43';
      const pwd = getCookie('pwd');
      const email = getCookie('email');
      if (!isEmpty(pwd) && !isEmpty(email)) {
        this.setState({ pwd, email, checkbox: true });
      }
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '';
  }

  passwordChange = (e, { value }) => {
    this.setState({ pwd: value, pwdError: false, showErrorMessage: false, errorMessage: '' });
  }

  emailChange = (e, { value }) => {
    this.setState({ email: value, emailError: false, showErrorMessage: false, errorMessage: '' });
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    return re.test(String(email).toLowerCase());
  }

  checkboxChange = () => {
    const { checkbox } = this.state;
    this.setState({ checkbox: !checkbox });
  }

  setPwdEmailCookie = () => {
    const { pwd, email } = this.state;
    var currentDate = new Date();
    var newDate = new Date();
    newDate.setDate(currentDate.getDate() + COOKIE_EXPIRE_DAYS);
    document.cookie = `email=${email}; expires=${newDate};`;
    document.cookie = `pwd=${pwd}; expires=${newDate};`;
  }

  setTokenCookie = (token, user_id) => {
    var currentDate = new Date();
    var newDate = new Date();
    newDate.setDate(currentDate.getDate() + SESSION_EXPIRE_DAYS);
    document.cookie = `token=${token}; expires=${newDate}; path=/`;
    document.cookie = `user_id=${user_id}; expires=${newDate}; path=/`;
  }

  clearCookie = () => {
    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (name === 'pwd' || name === 'email') {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  }

  redirectToHomepage = () => {
    window.location = `${window.location.origin}/homepage/`;
  }

  loginClick = async () => {
    const { pwd, email, checkbox } = this.state;
    if (!this.validateEmail(email)) {
      this.setState({ emailError: true, showErrorMessage: true, errorMessage: 'Invalid Email Id' });
      return null;
    }
    const outData = JSON.stringify({
      email,
      password: pwd,
      device_type: '2',
      device_id: '1234',
      device_token: 'abc'
    });
    this.setState({ loading: true });
    const result = await loginAPI(outData);
    if (result.status === 200) {
      if (checkbox) {
        this.setPwdEmailCookie();
      } else {
        this.clearCookie();
      }
      this.setTokenCookie(result.data.token, result.data.user_id);
      this.redirectToHomepage();
    } else if (result.status === 401) {
      this.setState({ pwdError: true, showErrorMessage: true, errorMessage: result.message });
    } else {
      this.setState({ pwdError: true, emailError: true, showErrorMessage: true, errorMessage: result.message });
    }
    this.setState({ loading: false });
  }

  render() {
    const { emailError, pwdError, checkbox, loading, pwd, email, showComponent } = this.state;
    const loginDisabled = isEmpty(pwd) || isEmpty(email);
    if (showComponent) {
      return (
        <Container className="login-main">
          <div>
            <div className="login-inputs">
              {
                // showErrorMessage && !isEmpty(errorMessage) &&
                // <Message negative>
                //   <Message.Header>{errorMessage}</Message.Header>
                // </Message>
              }
              <Image src={'/icleanlogo.png'} alt="iclean" size="small" centered />
              <Input
                value={email}
                placeholder="Valid Email"
                onChange={this.emailChange}
                error={emailError}
                autoFocus
              />
              <br />
              <Input
                value={pwd}
                placeholder="Password"
                type={'password'}
                onChange={this.passwordChange}
                error={pwdError}
              />
              <Grid className="login-checkbox-button-container">
                <Grid.Column floated="left" width={8} className="login-checkbox">
                  <Checkbox
                    label={'Remember Password'}
                    checked={checkbox}
                    onChange={this.checkboxChange}
                  />
                </Grid.Column>
                <Grid.Column floated="right" width={5} className="login-button">
                  <Button
                    positive
                    content="Login"
                    onClick={this.loginClick}
                    loading={loading}
                    disabled={loading || loginDisabled}
                  />
                </Grid.Column>
              </Grid>
            </div>
          </div>
        </Container>
      );
    }
    return null;
  }
}


export default Login;
