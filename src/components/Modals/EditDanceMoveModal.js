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


export default class EditDanceMoveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        danceMove: {
          name: '',
          description: '',
          direction: null,
        },

        modal: false,
    }

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if(this.props.danceMove) {
      this.setState({
        danceMove: this.props.danceMove
      })
    }
  }

  handleChange = e => {
    const danceMove = { ...this.state.danceMove, [e.target.name]: e.target.value}
    this.setState({
        danceMove
    })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSave(updatedDanceMove) {
    this.props.onSave(updatedDanceMove)
    this.props.toggle();
  }

  render() {
    const { danceMove, modal } = this.state;
    const { label } = this.props;
    // const { label, modal, toggle } this.props;

    return (
      <React.Fragment>
        <Button onClick={this.toggle}>{label}</Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{label}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Name</Label>
                <Input
                  type="text"
                  name="title"
                  value={danceMove.name}
                  onChange={this.handleChange}
                  placeholder="Enter Dance Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
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