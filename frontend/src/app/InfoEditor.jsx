import React from 'react';
import { EmployeeRepository } from '../api';
import { Redirect, Link } from 'react-router-dom';
import Logo from '../images/logo.png';

export class InfoEditor extends React.Component {

    employeeRepository = new EmployeeRepository();

    state = {
        first:'',
        last:'',
        email:'',
        password:'',
        type:"base_user",
        dept_id:''
    };

    onSubmit() {
        this.employeeRepository
        .addEmployee(this.state)
        .then(() => {
            alert("Employee Added");
            this.setState({ redirect: '/Departments' });
        });
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={ this.state.redirect } />
        // }
        return <>
             <img src={Logo} style={{width:'50%'}} alt="restock logo"></img>
            <Link to="/">
                    <button className="btn float-right">Logout</button>
            </Link>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/Home">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/Departments">Departments</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Add Employee</li>
                </ol>
            </nav>

            <form className="container">
                 <h1>Add an Employee</h1>
                <div className="form-group">
                    <label htmlFor="first">First Name</label>
                    <input type="text"
                        id="first"
                        name="first"
                        className="form-control"
                        placeholder="First Name"
                        value={this.state.first}
                        onChange={ e => this.setState({ first: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="last">Last Name</label>
                    <input type="text"
                        id="last"
                        name="last"
                        className="form-control"
                        placeholder="Last Name"
                        value={this.state.last}
                        onChange={ e => this.setState({ last: e.target.value }) } />
                </div>


                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={ e => this.setState({ email: e.target.value }) } />
                </div>

                <input type="checkbox" id="type" name="type" value="admin" onChange={ e => this.setState({ type: e.target.value })}/>
                <label for="type"> Check if administrator</label>

                <div className="col-3">
                    <label htmlFor="dept_id">Department</label>
                    <select
                        name="dept_id"
                        id="dept_id"
                        className="form-control"
                        value={this.state.department}
                        onChange={ e => this.setState({ dept_id: e.target.value })}>
                        <option></option>
                        {this.props.location.state.departments.map(department =>
                            <option key={department.dept_id} value={department.dept_id}>{department.dept_name}</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password"
                        id="pwd"
                        name="pwd"
                        className="form-control"
                        value={this.state.password}
                        onChange={ e => this.setState({ password: e.target.value }) } />
                </div>

                <button type="button"
                        className="btn btn-primary btn-block"
                        onClick={ () => this.onSubmit() }>
                        Add Employee
                </button> 
                <Link to="/Departments">
                    <button type="button" className="btn btn-secondary btn-block">Go back</button>
                </Link>

                    
            </form>
        </>
    }


    componentDidMount() {
        
    }
}