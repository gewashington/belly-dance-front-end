import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";

import './styles/Modal.scss';


export default class AddDanceMoveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        danceMove: {
          name: '',
          description: '',
          direction: null,
        },
        // isOpen: false,
    }

    // this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

//   componentDidMount() {
//       this.setState({
//         isOpen: this.props.isOpen
//       })
//   }

  handleChange = e => {
    const danceMove = { ...this.state.danceMove, [e.target.name]: e.target.value}
    console.log(e)
    this.setState({
        danceMove
    })
  }

//   toggle() {
//     this.setState({
//         isOpen: !this.state.isOpen,
//     })
//   }

  handleSave(updatedDanceMove) {
    this.props.onSave(updatedDanceMove)
    this.props.close();
  }

  render() {
      // const { isOpen, close } = this.props;
    const { danceMove } = this.state;
    const { label, close, isOpen }  = this.props;
    console.log('Dance Move', danceMove)
      
    return (
      <React.Fragment>
        <Modal isOpen={isOpen} toggle={close}>
          <ModalHeader toggle={close}>{label}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label className="label" for="title">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={danceMove.name}
                  onChange={this.handleChange}
                  placeholder="Enter Dance Name"
                />
              </FormGroup>
              <FormGroup>
                <Label className="label" for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={danceMove.description}
                  onChange={this.handleChange}
                  placeholder="Enter a description of the dance if possible"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.handleSave(danceMove)}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
      );
    }
}