import React from 'react';
import M from 'materialize-css'
import axios from 'axios'
import sha256 from 'sha256'
import Cookies from 'js-cookie'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class Signup extends React.Component {
    wrongUsername = ''
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            userAlreadyExists: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this)
    }
    handleChange(evt) {
        console.log(evt.target.name)
        this.setState({ [evt.target.name]: evt.target.value });
    }
    componentDidMount() {
        M.AutoInit()
        M.updateTextFields();
    }
    signup() {
        console.log(this.props)
        axios.post("/api/signup", {
            username: this.state.username,
            password: sha256(this.state.password)
        }).then(response => {
            if (response.data.response == 2) {
                this.wrongUsername =  this.state.username
                this.setState({
                    userAlreadyExists: true,
                })
            } else {

                Cookies.set('token', response.data.token)
                this.props.onLogin()
                console.log(response.data)
            }
        })
    }
    getMessage() {
        if (!this.state.userAlreadyExists) {
            return (
                <p className="flow-text">Create an Account</p>
            )
        } else {
            return (
                <div>
                    <p className="flow-text">Create an Account</p>
                    <p className="red-text">User {this.wrongUsername} already exists</p>
                </div>
            )
        }
    }
    render() {
        return (

            <div className="container">

                <div className="row">
                    <div className="clear-10"></div>
                    <form className="col s12">
                        <div className="row">
                            <div className="card hoverable">

                                <div className="card-content">
                                    <div className="row">
                                        {this.getMessage()}
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="username" id="username" type="text" className="validate" onChange={this.handleChange} />
                                            <label htmlFor="username">Username</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="password" id="password" type="password" className="validate" onChange={this.handleChange} />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-action">
                                    <div className="input-field right-align">
                                        <a className="waves-effect waves-light btn pulse  btn-large" onClick={this.signup} >Signup</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        )
    }
}
export default Signup;