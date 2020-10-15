import React from 'react'

class LearningObjectives extends React.Component{
    constructor(props) {
        super(props)

    }

    render() {
                let rows =  this.props.objectives.map(objective => {
            return (
                    <div className="row">
                        <div className="s8 col">
                            <p>{objective}</p>
                        </div>
                    </div>
            )
        })
        return (
            
                <div className="card">
                    <div className="card-content">
                      
                        {rows}
                    </div>

                </div>)
        
    }
}
export default LearningObjectives