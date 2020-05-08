import React from 'react';
import { Redirect } from 'react-router-dom';
import { ProductRepository, DepartmentRepository } from '../api';


export class ItemEditor extends React.Component {

    productRepository = new ProductRepository();
    departmentRepository = new DepartmentRepository();

    state = {
        dept_id: '',
        product_type_name: '',
        price: ''
    };

    onSubmit() {
        this.productRepository
        .addProductType(this.state)
        .then(() => {
            alert("Product Added");
            this.setState({ redirect: '/ProductsList' });
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }
        return <>
            <form className="container">
                <h1>Add an Item</h1>
                <div className="form-group">
                    <label htmlFor="product_type_name">Name</label>
                    <input type="text"
                        id="product_type_name"
                        name="product_type_name"
                        className="form-control"
                        value={this.state.name}
                        onChange={ e => this.setState({ product_type_name: e.target.value }) } />
                </div>

                <div className="col-3">
                    <label htmlFor="dept_id">Department</label>
                    <select
                        name="dept_id"
                        id="dept_id"
                        className="form-control"
                        value={this.state.department}
                        onChange={ e => this.setState({ dept_id: e.target.value })}>
                        <option></option>
                        {this.props.departments.map(department =>
                            <option key={department.dept_id} value={department.dept_id}>{department.dept_name}</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text"
                        id="price"
                        name="price"
                        className="form-control"
                        value={this.state.price}
                        onChange={ e => this.setState({ price: e.target.value }) } />
                </div>

                <button type="button"
                        className="btn btn-primary btn-block"
                        onClick={ () => this.onSubmit() }>
                        Add New Product
                </button>

                    
            </form>
        </>;
    }


    componentDidMount() {
    }
}