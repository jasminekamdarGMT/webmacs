import React, { Component } from 'react';
import './ToolTip.css';

class ToolTip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            definition: props.definition    
        };
    }

    render () {
        return (
            <div className="settings-tooltip">
                <span><i className="icon-question-sign"></i></span>
                <div className="settings-tooltiptext">{this.state.definition}</div>
            </div>
        )
    }
}

export default ToolTip;
