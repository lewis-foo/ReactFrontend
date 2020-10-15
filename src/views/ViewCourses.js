import React from 'react';
import M from 'materialize-css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import CourseItem from '../components/CourseView'
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class ViewCourses extends React.Component
{
    state = {
        courses: [],
        page: 1
    }
    constructor(props) {
        super(props)
        this.forwardClicked = this.forwardClicked.bind(this)
         this.backClicked = this.backClicked.bind(this)
    }
    getCourses(page = 1) {
        axios.get("/api/getCourse/" + page.toString()).then(response => {
            console.log(response.data)
            this.setState({
                courses: response.data
            })
        })
    }
    componentDidMount() {
        if(!this.props.user)
            this.props.history.push("/login")
    
        this.getCourses()
    }
    backClicked() {
        if (this.state.page != 1) {
              this.getCourses(this.state.page -1)
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    forwardClicked() {
        if (this.state.courses.length == 10) {
            this.getCourses(this.state.page + 1)
            this.setState({
                page: this.state.page + 1
            })
        }
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12 red darken-3 ">
                            <Link to="/view-courses" className="breadcrumb white-text text-darken-1">Code Curate</Link>
                            
                            <Link to="/view-courses" className="breadcrumb white-text text-darken-1">Courses</Link>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="card center">
                        <h1 className="red-text">Courses</h1>
                        <p className="flow-text">View our selection of courses here</p>
                        <div className="card-content white-text">
                            <div className="row">
                                            
                                        {this.state.courses.map(course => {
                                            return <CourseItem link={true}name={course.name} description={course.description} id={course._id}></CourseItem>
                        })}
                            </div>
                        </div>
                        <div className="card-action">
                            <a onClick={this.backClicked}className= {this.state.page==1? "btn-small disabled" : "btn-small"}><i class="material-icons">arrow_back</i></a>
                            <span style={{padding:10}}>{this.state.page}</span>
                            <a onClick={this.forwardClicked}className= {this.state.courses.length!=10? "btn-small disabled" : "btn-small"}><i class="material-icons">arrow_forward</i></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ViewCourses)