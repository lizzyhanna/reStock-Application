//This component is a page that displays information regarding a product

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ProductRepository } from '../api';
import  moment  from 'moment';
import { Badge } from 'react-bootstrap';

//ADD PRODUCT NAME TO TOP OF PAGE

export class ProductDisplay extends React.Component{

  productRepository = new ProductRepository();

  getExpiration(exp){
    var year = exp.slice(0,4)
    var month = exp.slice(5,7)
    var day = exp.slice(8,10)
    return month + '-' + day + '-' + year;
  }

  isExpired(exp){
    var currYear = new Date().getFullYear();
    var currMonth = new Date().getMonth() + 1;
    var currDay = new Date().getDate();
    var currDate = currYear + '-' + currMonth + '-' + currDay;
    var cutExpDate = exp.slice(0, 10);
      if(moment(cutExpDate).isSameOrBefore(currDate)){
        return true;
      }
    return false;
  }

  onSubmit(id) {
    this.productRepository
    .deleteProduct(id)
    .then(() => {
        alert("Item Deleted");
    });

    this.productRepository.getProducts()
    .then(products=> {
      this.setState(this.state.products = products.data);
      this.setState({section: this.props.match.params.id})
    });
}

  

  state = {
    products: [],
    section: '',
    today:''
  };

    render(){
      return (
          
        <div>
        <Link to="/">
                    <button className="btn float-right">Logout</button>
            </Link>
            
            <ol className="breadcrumb border border-0 rounded mb-0">
                <li className="breadcrumb-item"><a href="/Home">Home</a></li> 
                <li className="breadcrumb-item"><a href="/ProductsList">Products</a></li> 
                <li className="breadcrumb-item active" aria-current="page"> {this.props.location.state.product_type_name} </li> 
            </ol>

        <h1>{this.props.location.state.product_type_name} Inventory</h1>

        <div className="container">
            <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department</th>
                        <th>Location</th>
                        <th>Order</th>
                        <th>Sale</th>
                        <th>Expiration</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map(product =>
                        <tr key={product.product_id}>

                          {this.state.section == product.product_type_id && (  
                            <td>
                                {product.product_id}
                            </td>
                          )}
                          {this.state.section == product.product_type_id && (  
                            <td>
                                {product.dept_id}
                            </td>
                          )}
                          {this.state.section == product.product_type_id && (  
                            <td>
                                {product.location}
                            </td>
                          )}
                          {this.state.section == product.product_type_id && (  
                            <td>
                                {product.order_id}
                            </td>
                          )}
                          {this.state.section == product.product_type_id && ( 
                            <td>
                                {product.sale_id}
                            </td>
                          )}
                          {this.state.section == product.product_type_id && ( 
                            <td>
                                {this.isExpired(product.exp_date) && this.state.section !== 'sold' && ( 
                                    <Badge variant="danger">Expired</Badge> 
                                )}
                                {!(this.isExpired(product.exp_date)) && (
                                  this.getExpiration(product.exp_date)
                                )}
                            </td>
                          )}
                          {this.state.section == product.product_type_id && ( 
                            <td></td>
                          )}
                          {this.state.section == product.product_type_id && this.state.section !== 'sold' && (
                            <td>
                              {this.isExpired(product.exp_date) && (
                                <button type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={ () => this.onSubmit(product.product_id) }>
                                        X
                                    </button>
                              )} 
                            </td>
                          )}
                          
                        
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        
        </div>
        
      );
    }


    //prevents users who aren't logged in from accessing page
    componentWillMount(){
      if(window.sessionStorage.getItem("loggedIn") != 1){
          alert("Not logged in");
          this.setState({ redirect: '/' });
      }
    }

    componentDidMount(){
      this.productRepository.getProducts()
          .then(products=> {
            this.setState(this.state.products = products.data);
            this.setState({section: this.props.match.params.id})
          });
      this.setState({today: new Date()});
    }
    

  }
  
