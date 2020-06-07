import React, { Component } from 'react';
import { Animated } from 'react-animated-css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

toast.configure();
class Register extends Component {

    state = {
        email: "",
        password: "",
        name: "",
        error: false
    }

    notify = () => {
        toast('You have been Registered👌! Please Log in to continue.', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }

    notifyG = () => {
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

        if (token)
            this.props.history.push('/tasks');
    }

    //Local sign up
    onSubmit = async (e) => {
        e.preventDefault();

        const { email, password, name } = this.state;

        try {
            let res = await axios.post('/signup', { name, email, password });
            if (res.status == 200) {

                this.notify();
                this.props.history.push('/login');
            }
        } catch (err) {
            this.setState({ error: true })
        }

    }

    responseGoogle = async (response) => {

        console.log(response);

        let val = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            password: response.Ea
        }

        try {
            let res = await axios.post('/signup', { val });
            if (res.status == 200) {

                let res = await axios.post('/login', val);
                localStorage.setItem('token', res.data.token);

                this.notifyG();
                this.props.history.push('/tasks')
            }
        } catch (err) {
            let res = await axios.post('/login', val);
            localStorage.setItem('token', res.data.token);

            this.notifyG();
            this.props.history.push('/tasks')
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid text-center">
                    <form onSubmit={this.onSubmit} className="pt-5 form-signin">
                        <Animated animationIn="slideInLeft" isVisible={true}>
                            <img className="mb-4" src={require('../res/logo.png')} alt="" width="96" height="96" />
                            <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                        </Animated>
                        <Animated animationIn="fadeIn" isVisible={true}>
                            {this.state.error && <p className="text-danger">Email Invalid or Already Taken!</p>}
                            <label for="inputName" className="sr-only">Name</label>
                            <input onChange={(e) => { this.setState({ name: e.target.value }) }} type="text" id="inputName" className="form-control" placeholder="Username" required value={this.state.name} autofocus />
                            <label for="inputEmail" className="sr-only">Email address</label>
                            <input onChange={(e) => { this.setState({ email: e.target.value }) }} type="email" id="inputEmail" className="form-control" placeholder="Email address" required value={this.state.email} autofocus />
                            <label for="inputPassword" className="sr-only">Password</label>
                            <input minLength={8} onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} required />
                            <button className="btn btn-lg btn-danger btn-block" type="submit">Sign Up</button>

                            <GoogleLogin
                                clientId="232057162422-m58un6m1ikkphap126iqgjreiur67rui.apps.googleusercontent.com"
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} className="btn mb-1 btn-lg google-button shadow-sm btn-block" type="button">
                                        <img className="mr-3 mb-1" src={require('../res/google.png')} alt="" width="24" height="24" />
                            Google Sign Up
                                    </button>
                                )}
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            <a className="font-weight-bold text-danger" href="/login">Have an account? Sign in here.</a>
                            <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                        </Animated>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;