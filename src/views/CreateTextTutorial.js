import React from 'react'
import axios from 'axios'

class CreateTextTutorial extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            content: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.createClicked = this.createClicked.bind(this)
    }
    createClicked() {
        var sections = this.state.content.split('\n')
        axios.put("/api/addLesson", {
            name: this.state.name,
            description: this.state.description,
            type: "text",
            id: this.props.courseID,
            lessonData: {
                sections: sections
            }
        }).then(response => {
            console.log(response)
        })
    }
    handleChange(evt) {
        		this.setState({ [evt.target.name]: evt.target.value });
    }
    render() {
        return (
        <div id="text-tutorial" class="modal">
            <div class="modal-content">
                 <div className="row">
                    <div className="input-field col s12">
                        <input name="name" id="name" type="text" className="validate" onChange={this.handleChange} />
                        <label htmlFor="name">Lesson Name</label>
                    </div>
                    </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="description" id="description" type="text" className="validate" onChange={this.handleChange} />
                        <label htmlFor="description">Lesson Description</label>
                    </div>
                    </div>
                <div class="row">
                    <div class="input-field col s12">
                    <textarea name="content" id="content" class="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label for="content">Tutorial</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="waves-effect waves-green btn-flat" onClick={this.createClicked}>Create</a>
            </div>
        </div>
        )
    }
}
export default  CreateTextTutorial