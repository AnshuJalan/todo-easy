import React, { Component } from 'react';

class NavBar extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <nav className="fixed-top shadow-sm navbar navbar-light bg-danger">
                    <div className="navbar-header">
                        <a className="font-weight-bold ml-4 navbar-brand text-white" href="#">
                            <img className="mr-1 mb-1" src={require('../res/brand.png')} alt="" width="24" height="24" />
                        TODOeasy</a>
                    </div>

                    <ul className="navbar-nav ml-auto mr-4">
                        <li className="nav-item dropdown">
                            <a className="not-selectable nav-link dropdown-toggle font-weight-bold text-white" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-circle mr-2" />{this.props.user.name}</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a  data-toggle="modal" data-target="#logoutModal" className="dropdown-item" href="#">Logout <i className="text-secondary ml-2 fa fa-sign-out" /></a>
                                <a data-toggle="modal" data-target="#deleteModal" className="text-danger dropdown-item" href="#">Delete User <i className="text-danger ml-2 fa fa-trash"></i></a>
                            </div>
                        </li>
                    </ul>

                </nav>

                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="logoutModalLabel">Logout</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to logout? You can sign back in anytime 😄
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.props.logout} type="button" data-dismiss="modal" className="btn btn-danger">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete user</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete your account? All your data would be permanently removed 😕
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.props.deleteUser} type="button" data-dismiss="modal" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NavBar;