import React from "react";
import LearningObjectives from '../components/LearningObjective'
class DynamicLearningObjective extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            learningObjective: "",
            objectives: this.props.objectives ? this.props.objectives : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.addLearningObjective = this.addLearningObjective.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    addLearningObjective() {
        var learningObjective = this.state.objectives.concat(this.state.learningObjective)
        this.setState({
            objectives: learningObjective
        })
        this.props.changeLearningObjective(learningObjective)
    }
    deleteLearningObjective(objective) {
        var learningObjectives = this.state.objectives
        var index = learningObjectives.indexOf(objective);
        if (index !== -1) learningObjectives.splice(index, 1);
        this.setState({
            objectives: learningObjectives
        })
        this.props.changeLearningObjective(learningObjectives)
    }
    render() {
        return (
        <div>
            <div className="row">
                <div className="input-field col s8">
                    <textarea  name="learningObjective" id="learningObjective" type="text" className="materialize-textarea validate" onChange={this.handleChange} />
                    <label htmlFor="learningObjective">Learning Objective</label>
                </div>
                <div className="input-field col s4 valign-wrapper">

                    <a className="waves-effect waves-light btn  btn-small" onClick={this.addLearningObjective} >
                        <i class="material-icons">add</i>
                    </a>
                    </div>
                     </div>
                <div className="row">
                    <LearningObjectives objectives={this.state.objectives}/>
                </div>
           
        </div> 
        )
    }
}

export default DynamicLearningObjective;