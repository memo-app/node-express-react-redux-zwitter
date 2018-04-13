// Imports
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FacebookLoginButton, GoogleLoginButton, MicrosoftLoginButton, TwitterLoginButton } from 'react-social-login-buttons';

// App Imports
import Login from './login';

// CSS Imports
import './style.css';

class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>

                <section className="classical-login">
                    <Login />
                </section>

                <section className="social-logins">
                    <a href="/api/auth/facebook"><FacebookLoginButton /></a>
                    <a href="/api/auth/google"><GoogleLoginButton /></a>
                    <MicrosoftLoginButton />
                    <TwitterLoginButton />
                </section>

            </section>
        )
    }
}


export default Account;