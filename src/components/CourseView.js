import React from 'react';
import M from 'materialize-css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { withRouter } from 'react-router-dom'
class CourseItem extends React.Component
{
    
    render() {
        return (
            <div className="col s4">

         
            <div className="card grey darken-3 large white-text">
                <div className="card-content ">
                    <h4 className="card-title">{this.props.name}</h4>
                    <p className="flow-text">{this.props.description}</p>
                </div>
                    <div className="card-action grey darken-4">
                        {this.props.link ?
                            <Link className="btn-small" to={"/course/" + this.props.id} >Take Course</Link> :
                            <br />
                            }
                    
                </div>
                </div>
               </div>)
    }
}

export default withRouter(CourseItem)