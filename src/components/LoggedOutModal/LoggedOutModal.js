import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class LoggedOutModal extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  redirectToLoginURL = () => {
    window.location = '/';
  }

  render () {
    return (
      <Modal show={this.state.show}>
        <div className="modal-header">
          <h3>Communications Error</h3>
        </div>
        <div className="modal-body">
          Unable to communicate with the WebMACS controller. Reloading this page may help resolve the issue.
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" onClick={this.redirectToLoginURL}>Reload Now</button>
        </div>
      </Modal>
    )
  }
}

export default LoggedOutModal;
