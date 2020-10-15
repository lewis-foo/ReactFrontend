import React from 'react';
import CourseItem from '../components/CourseView'
import DynamicLessonsList from '../components/DynamicLessonsList'
import axios from 'axios'
import M from 'materialize-css'
import $ from 'jquery'
import LearningObjectives from '../components/LearningObjective'
import CreateTextTutorial from '../views/CreateTextTutorial'
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class EditCourse extends React.Component{
    constructor(params) {
        super(params)
        this.state = {
            course: null
        }
        this.lessonObjectiveRef = React.createRef()
   
    }
    componentDidMount() {

        this.getCourseInfo()


    }
    handleChange(evt) {
        
    }
    componentDidUpdate() {
        		M.AutoInit()
        M.updateTextFields();

                        if (document.getElementById('chips')) {
                            var chipInstance = M.Chips.getInstance(document.getElementById('chips'))
                            this.state.course.tags.forEach(element => {
                                chipInstance.addChip({ tag: element })
                                
                            });
                            var chips = document.getElementById('chips')
                           
                             var chip = chips.getElementsByClassName("chip")
                            for (var i = 0; i < chip.length; i++){
                                 var a = chip[i].getElementsByTagName("i")[0]
                                    chip[i].removeChild(a)
                            }
          
                            var input = chips.getElementsByTagName("input")[0]
                            chips.removeChild(input)
         
        }
    }

    getCourseInfo() {
           const { match: { params } } = this.props;
        axios.get("/api/course/" + params.id).then(response => {
            console.log(response)
            this.setState({
                course: response.data
            })
        })
    }
    render() {
        const { match: { params } } = this.props;
        if (this.state.course === null) {

            return(<h1>Loading</h1>)
        }
        return (
            <div>
                <CreateTextTutorial courseID={this.state.course._id}/>
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12 red darken-3 ">
                            <Link to="/view-courses" className="breadcrumb white-text text-darken-1">Code Curate</Link>
                            <Link  to="/profile" className="breadcrumb white-text text-darken-1">User</Link>
                            <Link to="/view-courses" className="breadcrumb white-text text-darken-1">Courses</Link>
                            <Link className="breadcrumb white-text text-darken-1">{this.state.course.name}</Link>

                    </div>
                    </div>
                </nav>
     
            <div className="container">
 
                                       <h1>Info</h1>
                <CourseItem link={false} name={this.state.course.name} description={this.state.course.description} />
                <div readonly="true"  className="disabled chips chips-initial " id="chips"></div>
                                       <h1>Learning Objectives</h1>
                    <LearningObjectives ref={this.lessonObjectiveRef} objectives={this.state.course.learningObjectives}/>
                                       <h1>Lessons</h1>
                    <DynamicLessonsList lessons={this.state.course.lessons} />
                
            </div>
            </div>

   
        )
    }
}

export default EditCourse