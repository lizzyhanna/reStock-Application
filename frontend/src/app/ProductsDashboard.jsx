import React from 'react';
import {ProductsList } from './ProductsList';
import { Redirect, Link } from 'react-router-dom';
import {ProductRepository} from './../api';
import { ProductSearch } from './ProductSearch';
import Logo from '../images/logo.png';

export class ProductsDashboard extends React.Component{
    productRepository = new ProductRepository();

    state = {
        products: []
    };

    onSearch(params){
        this.productRepository.getProductTypebyName(params.product_type_name)
        .then(products=> {
            debugger;
            this.setState({products : products.data});
        });
      
    }

    getAllProducts(){
        this.productRepository.getProductTypes()
        .then(products=> {
            this.setState({products : products.data});

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
        
            
            <Link to="/addItem">
                    <button className="btn float-right btn-primary">+</button>
            </Link>
            
            <ol className="breadcrumb border border-0 rounded mb-0">
                <li className="breadcrumb-item"><a href="/Home">Home</a></li> 
                
                <li className="breadcrumb-item active" aria-current="page"> Products List </li> 
            </ol>
            
            <ProductSearch onSearch={params=>this.onSearch(params)} getAllProducts={() => this.getAllProducts()}/>
            
            <h1 style={{padding: 10}}>What we carry:</h1>
            
            <ProductsList products={this.state.products}/>
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
       this.getAllProducts();
    }
}