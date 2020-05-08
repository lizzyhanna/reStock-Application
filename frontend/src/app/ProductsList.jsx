import React from 'react';
import {Link} from 'react-router-dom';
import {ProductType, Product} from '../models';
import { ProductDisplay } from './ProductDisplay';
import './ProductList.css';
export const ProductsList = props =>{
    return <> 
        <div className="container">
            <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>Out of Stock</th>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Department</th>
                        <th>Quantity in Stock</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map(product =>
                        <tr key={product.product_id}>
                            <td>
                                {/* Red dot if quantity in stock is 0 */}
                                {
                                    product.in_stock <= 0 &&
                                    <span className="dot"></span>
                                }
                            </td>
                            <td>
                                {product.product_type_id}
                            </td>
                            <td>
                                    {product.product_type_name}
                            </td>
                            <td>
                                ${product.price}.00
                            </td>
                            <td>
                                {product.dept_name}
                            </td>
                            <td>
                                {product.in_stock}
                            </td>
                            <td>
                                <Link to={{pathname: `/products/${product.product_type_id}`, state:{product_type_name : product.product_type_name}}}>
                                    <button type="button"
                                    className="btn btn-primary btn-sm">
                                        View Full Inventory
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    
                    )}
                </tbody>
            </table>
        </div>
    </>
}
