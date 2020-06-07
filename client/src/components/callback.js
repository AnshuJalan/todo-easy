// import React, { Component } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// //import Cookies from 'js-cookie';

// toast.configure();
// class Callback extends Component {
//     state = {  }

//     notify = () => {
//         toast('You have Signed In using Google! Happy Todo-ing ❤️', {
//             position: "bottom-left",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: false,
//             progress: undefined,
//             });
//     }

//     componentDidMount = async () => {

//         //let token = Cookies.get('token');
//         localStorage.setItem('token', token);

//         this.notify();
//         this.props.history.push('/login');
//     }

//     render() { 
//         return ( <div></div> );
//     }
// }
 
// export default Callback;