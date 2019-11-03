import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
  } from "reactstrap";

import './styles/Modal.scss';


export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     danceMove: {
    //       name: '',
    //       description: '',
    //       direction: null,
    //     },
        // isOpen: false,
    // }

    this.handleDelete = this.handleDelete.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }



  handleDelete() {
    this.props.onDelete(this.props.id)
    this.props.close();
  }

  render() {
    // const { isOpen, close } = this.props;
    // const { danceMove } = this.state;
    const { label, close, isOpen }  = this.props;
    // console.log('Dance Move', danceMove)
      
    return (
      <React.Fragment>
        <Modal isOpen={isOpen} toggle={close}>
          <ModalHeader toggle={close}>Delete {label}</ModalHeader>
          <ModalBody>
            <Form className="form-text">
              Are you sure you want to delete {label}?
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.handleDelete()}>
              Delete
            </Button>
            <Button color="success" onClick={() => close()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
      );
    }
}