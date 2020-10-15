import React from 'react';
import M from 'materialize-css'
import axios from 'axios'
import sha256 from 'sha256'
import Cookies from 'js-cookie'
import {
	BrowserRouter as Router,
	Switch,
	withRouter,
	Link
} from "react-router-dom";
class Login extends React.Component {
	wrongUsername = ''
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			passwordError: false,
			userError: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this)
	}
	handleChange(evt) {
		console.log(evt.target.name)
		this.setState({ [evt.target.name]: evt.target.value });
	}
	componentDidMount() {
		M.AutoInit()
		M.updateTextFields();
	}
	async login() {
		await axios.post("/api/login", {
			username: this.state.username,
			password: sha256(this.state.password)
		}).then(response => {
			if (response.data.response == 2) {
				this.setState({
					passwordError: true,
					userError: false
				})
			} else if (response.data.response == 3) {
				this.wrongUsername = this.state.username
				this.setState({
					userError: true
				})
			} else {
				Cookies.set('token', response.data.token)
				this.props.onLogin().then(() => {
							this.props.history.push('/')
				})
		
				console.log("whoop")
			}
		})
	}
	getMessage() {
		if (this.state.userError) {

			return (
				<div>
					<p className="flow-text">Enter your login details</p>
					<p className="red-text">User {this.wrongUsername}  doesn't exist</p>
				</div>
			)
		}
		if (!this.state.passwordError) {
			return (
				<p className="flow-text">Enter your login details</p>
			)
		} else {
			return (
				<div>
					<p className="flow-text">Enter your login details</p>
					<p className="red-text">Invalid Password</p>
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
										<a className="waves-effect waves-light btn pulse  btn-large" onClick={this.login} >Login</a>
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
export default withRouter(Login);