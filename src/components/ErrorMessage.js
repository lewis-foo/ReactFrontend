import React from 'react'

class ErrorMessage extends React.Component{

    render() {
        if (this.props.message.length === 0) {

            return (
                <div>
                    <p className="flow-text">{this.props.title}</p>
                </div>
            )
        } else {
            var errors = this.props.message.map((error) => {
                return (<li className="red-text flow-text">{error.msg}</li>)
            })
            return (
            <div>
                    <p className="flow-text">{this.props.title}</p>
                    <div style={{paddingLeft: 40}}>
                        {errors}
                </div>
                
            </div>

            )  
        }
    }
}

export default ErrorMessage