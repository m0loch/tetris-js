import React, { Component } from 'react';

class Subsection extends Component {
    render() {
        return (
            <fieldset {...this.props} >
                <legend>{ this.props.title }</legend>
                { this.props.children }
            </fieldset>
        )
    }
}

export default Subsection;