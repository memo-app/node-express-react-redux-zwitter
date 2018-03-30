// Imports
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FacebookLoginButton, GoogleLoginButton, MicrosoftLoginButton, TwitterLoginButton } from 'react-social-login-buttons';

// CSS Imports
import './style.css';

class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>

                <section className="social-logins">
                    <h2>Social Login</h2>
                    <br/>
                    
                    <a href="/api/auth/facebook"><FacebookLoginButton /></a>
                    <a href="/api/auth/google"><GoogleLoginButton /></a>
                    <MicrosoftLoginButton />
                    <TwitterLoginButton />
                </section>

                <section className="classical-login">
                    <h2>MemoApp Account</h2>
                    <br/>

                    <p><Link to="/account/login">Login with MemoApp username and password</Link></p>
                    <br />
                    <p><Link to="/account/register">Register at MemoApp with username and password</Link></p>
                </section>

            </section>
        )
    }
}


export default Account;