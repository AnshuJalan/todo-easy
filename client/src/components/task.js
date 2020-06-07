import React, { Component } from 'react';

class Task extends Component {
    state = {
        id: null,
        status: null,
        description: null,
        duedate: null,
        label: null,
        showBin: false,
        warning: false
    }

    componentDidMount = () => {
        let id = this.props.task._id;
        let status = this.props.task.status;
        let description = this.props.task.description;
        let duedate = new Date(this.props.task.duedate).toISOString().substr(0, 10);
        let label = this.props.task.label;

        this.checkDue(duedate);

        this.setState({ id, status, description, duedate, label })
    }

    componentWillReceiveProps = (newProps) => {
        let id = newProps.task._id;
        let status = newProps.task.status;
        let description = newProps.task.description;
        let duedate = new Date(newProps.task.duedate).toISOString().substr(0, 10);
        let label = newProps.task.label;

        this.checkDue(duedate);

        this.setState({ id, status, description, duedate, label })
    }

    checkDue = (duedate) => {
        let due = new Date(duedate).toISOString().substr(0, 10);
        let today = new Date().toISOString().substr(0, 10);


        if (parseInt(new Date(due).getTime()) < parseInt(new Date(today).getTime())) {
            this.setState({ warning: true })
        }
        else {
            this.setState({ warning: false })
        }
    }

    onChange = () => {
        if (this.state.status == 'inprogress') {
            this.setState({ status: 'completed' }, () => { this.props.modifyTask(this.state) })
        } else {
            this.setState({ status: 'inprogress' }, () => { this.props.modifyTask(this.state) })
        }
    }

    deleteTask = () => {
        this.props.deleteTask(this.state.id);
    }

    handleDate = (e) => {
        let newdate = e.target.value
        this.setState({ duedate: newdate }, () => { this.props.modifyTask(this.state) })
        console.log(this.state)
    }

    render() {
        return (
            <div onMouseEnter={() => { this.setState({ showBin: true }) }} onMouseLeave={() => { this.setState({ showBin: false }) }} >
                <div className="mx-4">
                    <div className="ml-2 custom-checkbox">
                        <input onChange={this.onChange} checked={this.state.status === 'completed'} id={"check" + this.state.id} className="checkbox" type="checkbox" />
                        <label for={"check" + this.state.id} className="check-label"></label>
                    </div>
                    {this.state.status === 'inprogress' &&
                        <span className="ml-2 taskField">{this.state.description}  {this.state.warning && <i className="ml-2 text-warning fa fa-clock-o" />} {this.state.showBin && <i onClick={this.deleteTask} className="ml-2 text-danger fa fa-trash" />}</span>
                    }
                    {this.state.status === 'completed' &&
                        <span style={{ textDecoration: 'line-through' }} className="ml-2 taskField">{this.state.description}</span>}
                    <input onChange={this.handleDate} max="2100-01-01" hidden={this.state.status === 'completed'} id="due" value={this.state.duedate} type="date" className="date-custom" />
                    <hr className="my-3" />
                </div>
            </div>
        );
    }
}

export default Task;