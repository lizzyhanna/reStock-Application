import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import  moment  from 'moment';
import {Sale} from '../models';
import {ProductType, Product} from '../models';
import {SaleRepository} from './../api/SalesRepository';

//Gabi, this is where you will create the ordered list of sales
export const SalesList = props =>{

        return <> 
        <div className="container">
            <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>Sale ID</th>
                        <th>Sale Date</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {props.sale.map(sale =>
                        <tr key={sale.sale_id}>
                            <td>
                                {sale.sale_id}
                            </td>
                            <td>
                                {moment(moment(sale.sale_date, 'YYYY-MM-DD')).format('MM-DD-YYYY')}
                            </td>
                        </tr>
                    
                    )}
                </tbody>
            </table>
        </div>
    </>
    
}

