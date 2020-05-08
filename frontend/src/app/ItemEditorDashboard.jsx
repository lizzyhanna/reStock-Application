import React from 'react';
import { DepartmentRepository } from '../api';
import { ItemEditor } from './ItemEditor';
import Logo from '../images/logo.png';
import { Redirect} from 'react-router-dom';

export class ItemEditorDashboard extends React.Component {

    departmentRepository = new DepartmentRepository();

    state = {
        departments: []
    };


    render() {
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }
        return <>
        <img src={Logo} style={{width:'50%'}} alt="restock logo"></img>
            <ol className="breadcrumb border border-0 rounded mb-0">
                <li className="breadcrumb-item"><a href="/Home">Home</a></li> 
                <li className="breadcrumb-item"><a href="/ProductsList">Inventory</a></li>
                <li className="breadcrumb-item active" aria-current="page"> Add New Product </li> 
            </ol>
            <ItemEditor departments={this.state.departments}/>
        </>;
    }

    componentWillMount(){
        if(window.sessionStorage.getItem("loggedIn") != 1){
            alert("Not logged in");
            this.setState({ redirect: '/' });
        }
    }

    componentDidMount() {
        this.departmentRepository.getDepartments()
        .then( departments=>{
            this.setState(this.state.departments = departments.data);
        });
    }
}