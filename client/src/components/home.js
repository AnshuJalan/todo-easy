import React, { Component } from 'react';
import { Animated } from 'react-animated-css';

import Navbar from './navbar';
import SideBar from './sidebar';
import Task from './task';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();
class Home extends Component {

  //TEST DATA
  state = {
    showButtonText: "Show Completed",
    showCompleted: false,
    user: null,
    listSelected: "Planned",
    lists: ['Personal', 'Work', 'Shopping', 'Others'],
    taskInputActive: false,
    hasTasks: false,
    tasks: null
  }

  notify = (desc) => {
    toast(desc, {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }

  changeSelectedList = (newList) => {
    this.setState({
      listSelected: newList,
      showButtonText: "Show Completed",
      showCompleted: false
    })

    this.getTasks();
  }

  componentDidMount = async () => {
    let token = localStorage.getItem('token');

    if (!token) {
      //Redirect to login page
      this.props.history.push('/login');
    }

    //Set User
    let user = await axios.get('/user', { headers: { "Authorization": `Bearer ${token}` } });
    this.setState({ user: user.data });

    this.getTasks();
  }

  getTasks = async () => {
    let token = localStorage.getItem('token');
    //Retrieve tasks
    try {
      let tasks = await axios.get('/task', { headers: { "Authorization": `Bearer ${token}` } });

      /*Task Filtering*/

      let filteredTasks;

      if (this.state.listSelected === 'Today') {
        filteredTasks = tasks.data.filter(task => new Date(task.duedate).toISOString().substr(0, 10) === new Date().toISOString().substr(0, 10));
      }
      else if (this.state.listSelected === 'Planned') {
        filteredTasks = tasks.data;
      }
      else {
        filteredTasks = tasks.data.filter(task => task.label === this.state.listSelected.toLowerCase());
      }

      if (filteredTasks.length == 0) {
        this.setState({ hasTasks: false });
        return;
      }

      //--------------------

      this.setState({
        hasTasks: true,
        tasks: filteredTasks,
        taskInputActive: false
      })
    } catch (err) {
      this.setState({ hasTasks: false, tasks: null })
      return;
    }
  }

  modifyTask = async (modTask) => {
    let token = localStorage.getItem('token');

    let task = {
      description: modTask.description,
      status: modTask.status,
      label: modTask.label,
      duedate: modTask.duedate
    }

    let res = await axios.patch('/task/' + modTask.id, task, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!res.data.error) {
      this.getTasks();
    }
  }

  addNewTask = async (e) => {
    e.preventDefault();

    let taskBody = {
      description: e.target.description.value,
      duedate: e.target.date.value,
      owner: this.state.user._id,
      label: this.state.listSelected == "Planned" || this.state.listSelected == "Today" ? "others" : this.state.listSelected.toLowerCase()
    }

    let token = localStorage.getItem('token');

    let res = await axios.post('/task',
      taskBody,
      { headers: { "Authorization": `Bearer ${token}` } });
    if (!res.data.error) {
      this.notify("📋 New Task Added: " + res.data.task.description);
      this.getTasks();
    }
  }

  deleteTask = async (id) => {
    let token = localStorage.getItem('token');
    let res = await axios.delete('/tasks/' + id, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      data: {
        user: this.state.user
      }
    })

    if (!res.data.error) {
      this.notify("🗑️ Task Removed: " + res.data.description);
      this.getTasks();
    }
  }

  getActive = () => {
    return this.state.tasks.filter((task) => task.status == "inprogress"
    ).map((task) => {
      return <Task task={task} deleteTask={this.deleteTask} modifyTask={this.modifyTask} key={task._id} />
    })
  }

  getCompleted = () => {
    return this.state.tasks.filter((task) => task.status == "completed"
    ).map((task) => {
      return <Task task={task} modifyTask={this.modifyTask} key={task._id} />
    })
  }

  toggle = () => {
    if (this.state.showCompleted)
      this.setState({
        showButtonText: "Show Completed",
        showCompleted: false
      })
    else
      this.setState({
        showButtonText: "Hide Completed",
        showCompleted: true
      })
  }

  logout = async () => {
    let token = await localStorage.getItem('token');
    let res = await axios.post('/logout', {}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!res.data.error) {
      localStorage.removeItem('token');
      this.props.history.push('/login');
    }
  }

  deleteUser = async () => {
    let token = await localStorage.getItem('token');
    let res = await axios.delete('/user/' + this.state.user._id, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!res.data.error) {
      localStorage.removeItem('token');
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        {this.state.user && <Navbar logout={this.logout} deleteUser={this.deleteUser} user={this.state.user} />
        }
        <div className="container-fluid">
          <div className="row">

            <SideBar selected={this.state.listSelected} lists={this.state.lists} changeSelectedList={this.changeSelectedList} />

            <div className="main col-md-9">
              <h4 style={{ marginTop: '80px' }} className="font-weight-bold text-danger px-4">
                {this.state.listSelected}
              </h4>

              {!this.state.taskInputActive &&
                <div className="m-4 ">
                  <a href="#" onClick={() => this.setState({ taskInputActive: true })} className="hover-danger">
                    <i className="mr-2 fa fa-plus"></i>
                    New Task
                </a>
                </div>}

              {this.state.taskInputActive &&
                <div className="custom-jumbotron">

                  <form onSubmit={this.addNewTask}>
                    <div className="row">

                      {this.state.listSelected !== 'Today' && <div className="col-md-9">
                        <input minLength={1} name="description" className="mb-2 form-control" type="text" placeholder="Enter Task Description" />
                      </div>}
                      {this.state.listSelected === 'Today' && <div className="col-md-12">
                        <input minLength={1} name="description" className="mb-2 form-control" type="text" placeholder="Enter Task Description" />
                      </div>}

                      {this.state.listSelected === 'Today' && <input hidden required name="date" value={new Date().toISOString().substr(0, 10)} id="due" type="date" className="date-custom-2" />}

                      {this.state.listSelected !== 'Today' && <div className="col-md-3">
                        <input max="2100-01-01" required name="date" id="due" type="date" className="date-custom-2" />

                      </div>}
                    </div>

                    <button type="submit" className="btn btn-danger">Add New</button>
                    <a href="#" onClick={() => { this.setState({ taskInputActive: false }) }} className="ml-2 hover-danger">
                      cancel
                  </a>
                  </form>
                </div>}

              {this.state.hasTasks &&

                <div>
                  {this.getActive()}

                  {this.state.showCompleted && <button onClick={this.toggle} type="button" className="mb-3 mx-4 btn btn-sm btn-light">{this.state.showButtonText}</button>}
                  {!this.state.showCompleted && <button onClick={this.toggle} type="button" className="mb-3 mx-4 btn btn-sm btn-danger">{this.state.showButtonText}</button>}

                  {this.state.showCompleted && <Animated animationIn="fadeIn" animationOut="fadeOut" animationOutDuration={0} isVisible={this.state.showCompleted}>
                    {this.getCompleted()}
                  </Animated>}

                </div>
              }

              {!this.state.hasTasks && <p className="ml-4 lead">No tasks yet. Click on New Task and get todo-ing!</p>}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
