//This function will generate a list of departments
import React from 'react';
import {EmployeeRepository} from './../api';
import { Link, Redirect } from 'react-router-dom';
export class DepartmentsList extends React.Component{

    employeeRepository = new EmployeeRepository();

    state = {
        employees: [],
        dept_id: '', 
        clicked:false
    }

    getEmployees(dept_id){
        this.employeeRepository.getEmployeesbyDept(dept_id)
            .then(x=>{
                this.setState({employees: x.data})
            }
        )
    }



    render(){
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }
        return <>

            <div className="container">
                <table className="table table-striped table-condensed">
                    <thead>
                        <tr> 
                            <th>Department</th>
                            <th>Manager</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.departments.map(department => 
                            
                                <tr key={department.dept_id}>
                                    <td>{department.dept_name}</td>
                                
                                    <td>{department.manager_first} {department.manager_last}</td>
                                    <td>
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#"+department.dept_name} onClick={()=>this.getEmployees(department.dept_id)}>
                                        View employees
                                    </button>

                                        <div key={department.dept_id} class="modal fade" id={department.dept_name} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                            aria-hidden="true">
                                                 <div className="modal-dialog" role="document">
                                                    <div className="modal-content">

                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">{department.dept_name} Department Employees</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>

                                                        <div className="modal-body">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>First Name</th>
                                                                        <th>Last Name</th>
                                                                        <th>Email</th>
                                                                        {/* {this.state.clicked && 
                                                                        <th>&nbsp;</th>
                                                                        } */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.employees.map(employee=>
                                                                        <tr key={employee.id}>
                                                                            <td>{employee.first}</td>
                                                                            <td>{employee.last}</td>
                                                                            <td>{employee.email}</td>
                                                            
                                                                            
                                                                        </tr>

                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div> 
                                                    
                                                        <div className="modal-footer">
                                                            
                                                            {/* <button type="button" className="btn btn-secondary" onClick={()=> this.setState({clicked:true})}>Edit</button> */}
                                                            <button type="button" className="btn btn-primary" onClick={()=> this.setState({clicked:false})} data-dismiss="modal">Close</button>
                                                        </div>

                                                    </div>
                                                </div>
                                        </div>
                                        
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>

                   
             </div>
        </>


    }
}