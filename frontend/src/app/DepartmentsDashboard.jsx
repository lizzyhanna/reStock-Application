//This serves as the container of the landing page for Departments. It will
//hold the department list and admin tools to edit departments.

import React from 'react';
import {DepartmentsList } from './DepartmentsList';
import {DepartmentRepository, EmployeeRepository} from './../api';
import { Redirect, Link } from 'react-router-dom';
import Logo from '../images/logo.png';


export class DepartmentsDashboard extends React.Component{

    departmentRepository = new DepartmentRepository();
    employeeRepository = new EmployeeRepository();

    state = {
        departments: []
    };

    // viewEmployees(dept_id){
    //     // TODO: display list of all employees with that dept_id
    //     this.departmentRepository.getEmployees(dept_id)
    //         .then(employees =>{
    //             employees.forEach(employee =>{
    //                 let 
    //             })
    //         })
    // // }
    // goToEdit(id){
    //     this.setState({redirect: '/editEmployee'});
    // }
  

    render(){
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }
        return<>
            <img src={Logo} style={{width:'50%'}} alt="restock logo"></img>
            <Link to="/">
                    <button className="btn float-right">Logout</button>
            </Link>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/Home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Departments</li>
                </ol>
            </nav>
        
            <h1> Departments</h1>
            <DepartmentsList departments={this.state.departments} goToEdit={()=>this.goToEdit()}/>
            <Link to={{pathname:"/addEmployee", state: {departments: this.state.departments}}}>
                <button type="button" className="btn btn-primary btn-block">Add an Employee</button>
            </Link>
            <Link to="/Home">
                    <button type="button" className="btn btn-secondary btn-block">Go back</button>
            </Link>
        </>
    }

    componentWillMount(){
        if(window.sessionStorage.getItem("loggedIn") != 1){
            alert("Not logged in");
            this.setState({ redirect: '/' });
        }
    }

    componentDidMount(){
        this.departmentRepository.getDepartments()
            .then(departments=> {
                this.setState(this.state.departments = departments.data);
            });
    }
}