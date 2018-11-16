import React, { Component } from 'react';

import { Input, Checkbox, Button, Container, Grid, Image } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import { COOKIE_EXPIRE_DAYS, BACKEND_URL } from '../../utils.js';

import './login.css'


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
    };
  };

  componentDidMount() {
    let pwd = '';
    let email = '';
    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');
    for (var i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i];
      const key = cookie.split('=')[0];
      const value = cookie.split('=')[1];
      if (key === 'email') {
        email = value;
      } else if (key === 'pwd') {
        pwd = value;
      }
    }
    if (!isEmpty(pwd) && !isEmpty(email)) {
      this.setState({ pwd, email, checkbox: true });
    }
  }

  passwordChange = (e, { value }) => {
    this.setState({ pwd: value, pwdError: false });
  }

  emailChange = (e, { value }) => {
    this.setState({ email: value, emailError: false });
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    return re.test(String(email).toLowerCase());
  }

  checkboxChange = () => {
    const { checkbox } = this.state;
    this.setState({ checkbox: !checkbox });
  }

  setCookie = () => {
    const { pwd, email } = this.state;
    var currentDate = new Date();
    var newDate = new Date();
    newDate.setDate(currentDate.getDate() + COOKIE_EXPIRE_DAYS);
    document.cookie = `email=${email}; expires=${newDate};`;
    document.cookie = `pwd=${pwd}; expires=${newDate};`;
  }

  clearCookie = () => {
    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  getCookie = (name) => {
    if (!document.cookie) {
      return null;
    }
    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(`${name}=`));
    if (xsrfCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }

  redirectToHomepage = () => {
    window.location = `${window.location.origin}/homepage/`;
  }

  loginClick = async () => {
    const { pwd, email, checkbox } = this.state;
    if (!this.validateEmail(email)) {
      this.setState({ emailError: true });
    }
    if (isEmpty(pwd)) {
      this.setState({ pwdError: true });
    }
    const outData = {
      email,
      password: pwd
    }
    this.setState({ loading: true });
    const result = await this.loginAPI(outData);
    this.setState({ loading: false });
    if (!result) {
      this.setState({ pwdError: true });
    } else {
      if (checkbox) {
        this.setCookie();
      } else {
        this.clearCookie();
      }
      this.redirectToHomepage();
    }
  }

  loginAPI = async (body) => {
    let returnData = null;
     await fetch(`${BACKEND_URL}/admin/`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'X-CSRFToken': this.getCookie('csrftoken'),
      },
      body: body,
    })
    .then(response => {
      response.json();
      if(response.status === 200){
        alert(
         response.json()
        )
      }
    })
    .catch(error => console.log('POST ERROR-',error))
    .then((data) => {
      returnData = data;
    }).catch(error => console.log('POST ERROR-', error));
    return returnData;
  }

  render() {
    const { emailError, pwdError, checkbox, loading, pwd, email } = this.state;
    return (
      <Container className="login-main">
        <div>
          <div className="login-inputs">
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
                  disabled={loading}
                />
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}


export default Login;
