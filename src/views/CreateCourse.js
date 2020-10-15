import React from 'react';
import M from 'materialize-css'
import axios from 'axios'
import sha256 from 'sha256'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import DynamicLearningObjective from '../components/DynamicLearningObjective';
import ErrorMessage from '../components/ErrorMessage';
class CreateCourse extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
            description: '',
            learningObjective: "",
            tags: [],
            learningObjectives: [],
            priorKnowledge: [],
            message: []
		}
		this.handleChange = this.handleChange.bind(this);
        this.createCourse = this.createCourse.bind(this)
        this.changeLearningObjectives = this.changeLearningObjectives.bind(this)
	}
	handleChange(evt) {
		console.log(evt.target.name)
		this.setState({ [evt.target.name]: evt.target.value });
	}
	componentDidMount() {
		M.AutoInit()
		M.updateTextFields();
	}
    createCourse() {
        var chipInstance = M.Chips.getInstance(document.getElementById("tags"))
        console.log(chipInstance)
        var tags = []
        chipInstance.chipsData.forEach(element => {
            tags.push(element.tag)
        });
        console.log(chipInstance)
        axios.post("/api/createCourse", {
            name: this.state.name,
            description: this.state.description,
            learningObjectives: this.state.learningObjectives,
            tags: tags
        }).then(response => {
            console.log(response)
            if (response.data.hasOwnProperty("errors")) {
                            this.setState({
                message: response.data.errors
            })
            } else {
                
            }

        })
	}
    changeLearningObjectives(objectives) {
        this.setState({
            learningObjectives: objectives
        })
    }
	render() {
		return (
            <div>
                 <nav>
                    <div className="nav-wrapper">
                        <div className="col s12 red darken-3 ">
                            <Link to="/view-courses" className="breadcrumb white-text text-darken-1">Code Curate</Link>
                            <Link to="/view-courses" className="breadcrumb white-text text-darken-1">Courses</Link>
                            <Link to="/create-course" className="breadcrumb white-text text-darken-1">Create Course</Link>
                        </div>
                    </div>
                </nav>
                <div className="container">

                    <div className="row">
                        <div className="clear-10"></div>
                        <form className="col s12">
                            <div className="row">
                                <div className="card hoverable">
             
                                    <div className="card-content">
                                        <div className="row">
                                            <ErrorMessage title="Create a New Course" message={this.state.message}/>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" id="name" type="text" className="validate" onChange={this.handleChange} />
                                                <label htmlFor="name">Course Name</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea  name="description" id="description" type="text" className="materialize-textarea validate" onChange={this.handleChange} />
                                                <label htmlFor="description">Description</label>
                                            </div>
                                        </div>
                                        <DynamicLearningObjective changeLearningObjective ={this.changeLearningObjectives}/>
                                        <div className="row">
                                            <div class="chips" id="tags"></div>
                                            <label htmlFor="tags">Tags</label>
                                        </div>
                                    </div>
                                    <div className="card-action">
                                        <div className="input-field right-align">
                                            <a className="waves-effect waves-light btn pulse  btn-large" onClick={this.createCourse} >Create Course</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

		)
	}
}
export default withRouter(CreateCourse);