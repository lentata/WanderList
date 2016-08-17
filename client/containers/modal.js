import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import Login from './login';

export default class OurModal extends Component{
   constructor(props){
    super(props);
    this.state = {
      showModal: false
    }
    OurModal.context = this;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    OurModal.context.setState({'showModal': false});
  }

  open() {
    OurModal.context.setState({'showModal': true });
  }

  render() {
    return (
      <div>
        <Button onClick={this.open}>
          Sign In
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="modal_title">
                <img height="100%" src="../orange_logo.png" alt="wanderlist" />
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="login_tagline">Let's Wander</h4>
            <Login />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
