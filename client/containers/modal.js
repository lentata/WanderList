import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import Login from './login';
import Signup from './signupTwo';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class OurModal extends Component{
   constructor(props){
    super(props);
    this.state = {
      showModal: false
    }
    OurModal.context = this;
    // this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    OurModal.context.setState({'showModal': true });
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    return (
      <div>
        <Button onClick={this.open}>
          {this.props.status}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="modal_title">
                <img height="100%" src="../orange_logo.png" alt="wanderlist" />
              </h2>
            </Modal.Title>

            <Tabs>
              <TabList>
                <Tab>Log In</Tab>
                <Tab>Sign Up</Tab>
              </TabList>

              <TabPanel>
                <h4 className="login_tagline">Let's Wander</h4>
                <Login />
              </TabPanel>

              <TabPanel>
                <h4 className="login_tagline">Join Wanderlist</h4>
                <Signup />
              </TabPanel>
            </Tabs>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}
