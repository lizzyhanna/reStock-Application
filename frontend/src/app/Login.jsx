import React, {Component} from 'react';
import Logo from '../images/logo.png';
import './Login.css';
import { Link, Redirect } from 'react-router-dom';
import { EmployeeRepository } from '../api';

export class Login extends React.Component{
    userRepository = new EmployeeRepository();

    state = {
        email:'',
        password:''
    }

   getCredentials(){
        this.userRepository.login(this.state)
            .then(x=>{
                console.log(x);
                if(x.data[0].Valid === 1){
                    alert("Login success.");
                    window.sessionStorage.setItem("loggedIn", 1);
                    this.setState({redirect: '/Home'});
                }else{
                    alert("Login failed.");
                    this.setState({email: '', password:''});
                }
            })
   }

    render(){
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }
        return(<>
            <div className="App">
                <header className="App-header">
                    <img src={Logo}></img>
        
                    <div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input name="email" 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={e=>this.setState({email: e.target.value})}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input name="password" 
                                    className="form-control" 
                                    type="password" 
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={e=>this.setState({password: e.target.value})}></input>
                            </div>  
                                <button id="logIn" 
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.getCredentials()}>
                                        Log In
                                </button>
                        </form>

                    </div>

                    <Link to='/ForgotPassword'>
                        <button id="forgotPassword" 
                            className="btn btn-secondary" >
                            Forgot Password?
                        </button>
                    </Link>
                </header>
            </div>
            </>
        );
    }

    componentWillMount(){
        window.sessionStorage.setItem("loggedIn", 0);
    }
}

