import React from 'react'
import axios from 'axios'
import LessonItem from '../components/LessonItem'
class DynamicLessonsList extends React.Component{

    render() {
        return (
            <div className="card">
                <div className="card-content">
                {
                    this.props.lessons.map(lesson => {
                        return <LessonItem id={lesson}/>
                    })
                    }
                </div>
                
  

                <div className="card-action">

                    <a href="#text-tutorial" class="btn modal-trigger">Create Text Tutorial</a>
                   
                </div>

            </div>
        )
    }
}

export default DynamicLessonsList