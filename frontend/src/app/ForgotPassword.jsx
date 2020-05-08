//This component is a page that has contact info for user if they forgot their password

import React from 'react';
import './ForgotPassword.css';
import { Redirect, Link } from 'react-router-dom';



export class ForgotPassword extends React.Component{

  state={
    
  }
    render(){
      if (this.state.redirect) {
        return <Redirect to={ this.state.redirect } />
      }
      return (
        <div className="contain jumbotron" style={{background: '#50E3C2', height: '47.4rem'}}>
            <h1 className="display-4">Forget your password?</h1>
            <p className="lead">Please get in contact with the administrator: admin@gmail.com</p>
            <Link to='/'>
                <button id="forgotPassword" 
                    className="btn btn-secondary" >
                    Back to Login
                </button>
            </Link>
        </div>
      );
    }
  }

