import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

class ProcessingIndicator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x600: props.x600,
            show: props.show,
            onClose: props.onClose
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          show: nextProps.show
        });
    }

    close = () => {
        this.state.onClose();
    }

    render () {
        return (
            <Modal className="ProcessingIndicator" show={this.state.show}>
                <div className="modal-body" style={{textAlign: "-webkit-center"}}>
                    <h4 style={{padding: "16px"}}>
                        Please wait while data is processing.
                    </h4>
                    <div className="loading-container" style={{padding: "16px"}}>
                        <div className="dot-flashing"></div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ProcessingIndicator;
