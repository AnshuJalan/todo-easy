import React, { Component } from 'react';
import axios from 'axios';
import { Animated } from 'react-animated-css';
import GoogleLogin from 'react-google-login';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();
class Login extends Component {
    state = {
        email: "",
        password: "",
        error: false
    }

    notify = () => {
        toast('You have Signed In Successfully! Happy Todo-ing ❤️', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }

    componentDidMount = () => {
        let token = localStorage.getItem('token');

        if (token) {
            this.props.history.push('/tasks');
        }
    }

    //Local login
    onSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        let res = await axios.post('/login', { email, password });
        if (res.data.error) {
            this.setState({ error: true })
        }
        else {
            localStorage.setItem('token', res.data.token);

            this.notify();
            this.props.history.push('/tasks')
        }
    }

    //Google login
    responseGoogle = async (response) => {

        console.log(response);

        let val = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            password: response.Ea
        }

        let res = await axios.post('/login', val);
        if (res.data.error) {
            //Doesn't exist, sign up
            try {
                let res = await axios.post('/signup', val);
            } catch (err) {
                this.setState({ error: true })
            } finally {
                let res = await axios.post('/login', val);

                localStorage.setItem('token', res.data.token);

                this.notify();
                this.props.history.push('/tasks')
            }
        }
        else {
            localStorage.setItem('token', res.data.token);

            this.notify();
            this.props.history.push('/tasks')
        }
    }

    render() {
        return (
            <div>
                <div className="mt-2 login-body text-center">
                    <form onSubmit={this.onSubmit} className="pt-5 form-signin">
                        <Animated animationIn="slideInLeft" isVisible={true}>
                            <img className="mb-4" src={require('../res/logo.png')} alt="" width="96" height="96" />
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        </Animated>
                        <Animated animationIn="fadeIn" isVisible={true}>
                            {this.state.error && <p className="text-danger">Invalid Email or Password!</p>}
                            <label for="inputEmail" className="sr-only">Email address</label>
                            <input onChange={(e) => { this.setState({ email: e.target.value }) }} type="email" id="inputEmail" className="form-control" placeholder="Email address" required value={this.state.email} autofocus />
                            <label for="inputPassword" className="sr-only">Password</label>
                            <input onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} required />
                            <button className="btn btn-lg btn-danger shadow-sm btn-block" type="submit">Sign in</button>
                            <GoogleLogin
                                clientId="232057162422-m58un6m1ikkphap126iqgjreiur67rui.apps.googleusercontent.com"
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} className="btn mb-1 btn-lg google-button shadow-sm btn-block" type="button">
                                        <img className="mr-3 mb-1" src={require('../res/google.png')} alt="" width="24" height="24" />
                            Google Sign in
                                    </button>
                                )}
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            <a className="font-weight-bold text-danger" href="/signup">New User? Register here.</a>
                            <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                        </Animated>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;