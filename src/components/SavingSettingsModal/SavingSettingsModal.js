import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

function ModalHeader (props) {
    return (
        <div className="modal-header">
            { !props.unsavedValues &&
                <button type="button" className="close" aria-hidden="true" onClick={props.onCloseClicked}>&times;</button>
            }
            <h3>Saving {props.groupTitle}</h3>
        </div>
    )
}

function ModalBody (props) {
    return (
        <div className="modal-body">
            {props.message}
        </div>
    )
}

function ModalFooter (props) {
    return (
        <div className="modal-footer">
            { !props.unsavedValues &&
                <button className="btn btn-primary" onClick={props.onOkayClicked}>Okay</button>
            }
        </div>
    )
}

class SavingSettingsModal extends Component {
    constructor(props) {
        super(props);
    
        this.state = this.stateFromProps(props);

        this.saveUnsavedValues = this.saveUnsavedValues.bind(this);
        this.handleValuesSaved = this.handleValuesSaved.bind(this);
        this.close = this.close.bind(this);
    }

    stateFromProps(props) {
        return {
            show: props.show,
            message: "Saving settings to WebMACS controller...",
            unsavedValues: props.unsavedValues,
            groupTitle: props.groupTitle,
            handleClose: props.onClose,
            x600: props.x600
        }
    }

    componentWillReceiveProps(nextProps) {
        let new_state = this.stateFromProps(nextProps);
        if (this.state.show === false && new_state !== this.state) {
            this.setState(new_state);
        }
    }

    close () {
        this.setState({ show: false });
        this.state.handleClose();
    }

    saveUnsavedValues () {
        if (this.state.show === true && this.state.unsavedValues) {
            this.state.x600.saveSettingsValues(this.state.unsavedValues, this.handleValuesSaved);
        } else {
            this.setState({
                unsavedValues: null,
                message: "No updated values to save."
            })
        }
    }

    handleValuesSaved (success, error_messages) {
        if (success) {
            this.setState({
                unsavedValues: null,
                message: this.state.groupTitle+" saved successfully!"
            })
        } else {
            this.setState({
                unsavedValues: null,
                message: 'ERROR: '+String(error_messages)
            })
        }
    }

    render () {
        return (
            <Modal show={this.state.show} onHide={this.close} onShow={this.saveUnsavedValues}>
                <ModalHeader groupTitle={this.state.groupTitle} unsavedValues={this.state.unsavedValues} />
                <ModalBody message={this.state.message} />
                <ModalFooter unsavedValues={this.state.unsavedValues} onOkayClicked={this.close} />
	        </Modal>
        )
    }
}

export default SavingSettingsModal;
