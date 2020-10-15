import React from 'react'
import LessonsList from '../components/LessonsList'
import axios from 'axios'
class LessonView extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            lessons: {
                title: "",
                sections:[]
            }
        }
    }
    getSections() {
        return this.state.lessons.sections.map(section => {
            if (section.startsWith('#')) {
                return (<h2>{section.substr(1)}</h2>)
            } else {
                return (<p className="flow-text">{section}</p>)
            }
            
        })
    }
    componentDidMount() {
        
        this.getLessonInfo()
    }
        getLessonInfo() {
           const { match: { params } } = this.props;
        axios.get("/api/getLesson/" + params.id).then(response => {
            console.log(response)
            this.setState({
                title: response.data.name,
                description: response.data.description,
                lessons: response.data.lessonData
            })
        })
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        <h1>{this.state.title}</h1>
                        <p className="flow-text">{this.state.description}</p>
                    </div>
                    <div className="card-content">
                        {this.getSections()}
                    </div>
                </div>
            </div>
        )
    }
}
export default LessonView