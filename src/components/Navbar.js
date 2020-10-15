import React from 'react';
import M from 'materialize-css'
import {
    BrowserRouter as Router,
    withRouter,
    Route,
    Link
} from "react-router-dom";
import Cookies from 'js-cookie';
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    componentDidMount() {
        M.AutoInit()
    }
    logout() {
        Cookies.remove("token")
        this.props.history.push("/login")
        this.props.logout()
    }
    signedInNavbar() {
        return (
            <nav>
                <div className="nav-wrapper red darken-1">
                    <Link to="/" className="brand-logo center">CodeCurate</Link>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li> <Link to="/view-courses">View Courses</Link></li>
                        <li> <Link to="/create-course">Create Course</Link></li>
                    </ul>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li> <Link to="/profile">{this.props.user.displayName}</Link></li>
                        <li> <a onClick={this.logout}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        )
    }

    signedOutNavbar() {
        return (
            <nav>
                <div className="nav-wrapper red darken-1">
                    <Link to="/" className="brand-logo">CodeCurate</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
    render() {
        if (this.props.user) {
            return this.signedInNavbar()
        } else {
            return this.signedOutNavbar()
        }
    }
}
export default withRouter(Navbar);