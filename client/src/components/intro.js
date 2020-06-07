import React, { Component } from 'react';
import { Animated } from 'react-animated-css';

class Intro extends Component {
    state = {}
    render() {
        return (
            <div className="intro-component">

                <Animated animationIn="slideInDown" isVisible={true}>
                    <nav className="navbar navbar-expand-lg bg-transparent">
                        <div className="container">

                            <div className="navbar-header">
                                <a className="font-weight-bold navbar-brand custom-brand" href="/">
                                    <img className="mr-1 mb-2" src={require('../res/brand-danger.png')} alt="" width="36" height="36" />
                                    <span style={{ fontSize: '1.4rem' }}>TODOeasy</span></a>
                            </div>

                            <button className="text-secondary navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto mr-3">
                                    <li className="nav-item">
                                        <a className="nav-link font-weight-bold text-secondary" href="/login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link font-weight-bold text-danger" href="/signup">Signup</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </Animated>


                <div className="intro-div text-center">
                    <Animated animationIn="fadeIn" isVisible={true}>
                        <h1 style={{ fontSize: "4.0rem" }} >Welcome to <span className="font-weight-bold text-danger">TODOeasy</span></h1>
                        <p className="lead">A minimalist task management app</p>
                        <button onClick={() => this.props.history.push('/signup')} className="mt-3 btn btn-lg btn-danger">Get Started</button>
                    </Animated>
                </div>

                <div className="tag text-center">
                    <p className="text-muted">&copy; 2020 | Developed By <a href="https://github.com/krishnaflutter">Krishna</a> & <a href="https://github.com/AnshuJalan">Anshu</a> ✌</p>
                </div>

            </div>
        );
    }
}

export default Intro;