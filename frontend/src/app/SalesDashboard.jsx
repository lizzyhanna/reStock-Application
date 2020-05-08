import React from 'react';
import {SalesList } from './SalesList';
import { Redirect, Link } from 'react-router-dom';
import {SaleRepository} from './../api';
import Logo from '../images/logo.png';

export class SalesDashboard extends React.Component{
    salesRepository = new SaleRepository();

    state = {
        sale: []
    };

    onSearch(params){
        this.salesRepository.getSales(params)
        .then(sale=> {
            this.setState({sale : sale.data});
        });
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }
        return<>
             <img src={Logo} style={{width:'50%'}} alt="restock logo"></img>
            <Link to="/">
                    <button className="btn float-right">Logout</button>
            </Link>
        
            
            <ol className="breadcrumb border border-0 rounded mb-0">
                <li className="breadcrumb-item"><a href="/Home">Home</a></li> 
                
                <li className="breadcrumb-item active" aria-current="page"> Sales List </li> 
            </ol>
         
            <h1 style={{padding: 10}}>Sales</h1>
            <SalesList sale={this.state.sale}/>
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
        this.onSearch();
    }
}