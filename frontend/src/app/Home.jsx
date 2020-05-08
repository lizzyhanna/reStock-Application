//This is the main landing page of the app that gives the user options

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../images/logo.png';

export class Home extends React.Component{
    state ={}
    logout(){
        window.sessionStorage.setItem("loggedIn", 0);
        this.setState({redirect: '/'});
    }
    render(){
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }
        return (<>
            <nav>
                <Link to="/">
                    <button type="button" className="btn float-right" onClick={()=> this.logout()}>Logout</button>
                </Link>
            </nav>
            <div className="jumbotron">
                <img src={Logo} style={{width:'50%'}} alt="restock logo"></img>
                <h1 className="jumbotron">reStock Home</h1>
                <p className="lead">What would you like to do today?</p>
                <hr className="my-4"/>
                <p>Please select from the following options:</p>
                <div className="container">
                    <div>
                            <Link to="/ProductsList">
                                <button className="btn btn-block btn-primary btn-lg">Inventory</button>
                            </Link>
                        </div>

                    <div className="row">
                        <div className="col">
                            <Link to="/Departments">
                                <button className="btn btn-block btn-secondary btn-lg">Departments</button>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/Sales">
                                <button className="btn btn-block btn-secondary btn-lg">Sales</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }

    componentWillMount(){
        if(window.sessionStorage.getItem("loggedIn") != 1){
            alert("Not logged in");
            this.setState({ redirect: '/' });
        }
    }
}