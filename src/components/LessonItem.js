import React from 'react'
import axios from 'axios'
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class LessonItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            lesson: {},
            description: "",
            name: ""
        }
      
    }
    componentDidMount() {
          this.getLesson()
    }
    getLesson() {
        axios.get('/api/getLesson/'+ this.props.id).then(response => {
            this.setState({
                name: response.data.name,
                description: response.data.name,
                type: response.data.type
            })
        })
    }
    render() {
        if (this.state.name != "") {
                    return (
                    <div className="card card-panel  grey darken-3 white-text center">
                        <h3 className="flow-text">Name: {this.state.name}</h3>
                            <p className="flow-text"><strong>Description: </strong>{this.state.description}</p>
                                                    <p className="flow-text"><strong>Type: </strong>{this.state.type}</p>
                        <div className="card-action">
                            <Link className="btn-small" to={"/lesson/" + this.props.id} >Take Lesson</Link> 
                            
                        </div>
                    </div>
        )
        } else {
            return (            <div className="card-panel  grey darken-3 white-text">
                <h3>error</h3>
            </div>)
        }

    }
}

export default LessonItem