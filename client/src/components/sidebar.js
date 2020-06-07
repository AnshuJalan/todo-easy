import React, { Component } from 'react';
import { Animated } from "react-animated-css";

class SideBar extends Component {
    state = {}

    getLists = () => {
        return this.props.lists.map(list => {
            if (list === this.props.selected) {
                return (
                    <li onClick={() => this.props.changeSelectedList(list)} className="nav-item">
                        <a className="text-danger nav-link">
                            <i className="fa fa-list-ul mr-3"></i>
                            {list}
                        </a>
                    </li>
                );
            }
            return (
                <li onClick={() => this.props.changeSelectedList(list)} className="nav-item">
                    <a className="nav-link">
                        <i className="fa fa-list-ul mr-3"></i>
                        {list}
                    </a>
                </li>
            );
        })
    }

    render() {
        return (
            <nav className="shadow-sm col-md-3 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <Animated animationIn="slideInLeft" isVisible={true}>
                        < h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 pt-4 mb-2 text-muted">
                            TASKS
                            <a className="d-flex align-items-center text-muted">
                            </a>
                        </h4>
                        <ul className="nav flex-column mb-2">
                            <li onClick={() => this.props.changeSelectedList('Today')} className="nav-item">
                                {this.props.selected === 'Today' && <a className="text-danger nav-link">
                                    <i className="fa fa-sun-o mr-3"></i>
                                Today
                            </a>}
                                {this.props.selected !== 'Today' && <a className="nav-link">
                                    <i className="fa fa-sun-o mr-3"></i>
                                Today
                            </a>}
                            </li>
                            <li onClick={() => this.props.changeSelectedList('Planned')} className="nav-item">
                                {this.props.selected === 'Planned' && <a className="text-danger nav-link">
                                    <i className="fa fa-pencil-square-o mr-3"></i>
                                Planned
                            </a>}
                                {this.props.selected !== 'Planned' && <a className="nav-link">
                                    <i className="fa fa-pencil-square-o mr-3"></i>
                                Planned
                            </a>}
                            </li>
                        </ul>
                        <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-2 text-muted">
                            LISTS
                            <a className="d-flex align-items-center text-muted">
                            </a>
                        </h4>
                        <ul className="nav flex-column mb-2">
                            {this.getLists()}
                        </ul>
                    </Animated>
                </div>
            </nav>
        );
    }
}

export default SideBar;