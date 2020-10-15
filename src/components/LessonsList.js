import React from 'react'
import axios from 'axios'
import LessonItem from '../components/LessonItem'
class LessonsList extends React.Component{

    render() {
        return (
            <div>
                {
                    this.props.lessons.map(lesson => {
                        return <LessonItem id={lesson}/>
                    })
                }
            </div>
        )
    }
}

export default LessonsList