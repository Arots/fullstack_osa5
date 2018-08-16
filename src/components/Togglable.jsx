import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        return (
            <div className="content">
                {this.state.visible ? (
                    <div>
                        {this.props.children}
                        <br/>
                        <button type='button' className="button" onClick={this.toggleVisibility}>Peruuta</button>
                    </div>
                ) : (
                    <div>
                        <button className="buttonIsompi" onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
                    </div>
                    )}
            </div>
        )
    }

}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable