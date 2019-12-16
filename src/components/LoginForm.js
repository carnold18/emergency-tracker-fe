import React, { Component } from 'react';

class LoginForm extends Component {

    render() {
        return (
            <div className="header">
                <h4 className="align-center">Already a Member?</h4>
                <h5 className="align-center">Sign In:</h5>
                <div className="login">
                    <form onSubmit={this.props.logIn}>
                        <input
                            type="text"
                            onChange={this.props.handleChange}
                            placeholder="email"
                            name="email"
                        />
                        <input
                            type="password"
                            onChange={this.props.handleChange}
                            placeholder="password"
                            name="password"
                        /><br /><br />
                        <input type="submit" className="button small special align-center"/>
                        <br /><br /><a href="/signup">Or Sign Up!</a>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;