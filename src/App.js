import React from 'react';
import axios from 'axios';
import { 
Button, 
Card, 
CardBody,
CardTitle, 
CardText, 
DropdownItem,
DropdownToggle,
DropdownMenu,
Navbar,
NavbarBrand,
UncontrolledDropdown,
} from 'reactstrap';

import AddDanceModal from './components/Modals/AddDanceMoveModal';
import EditDanceMoveModal from './components/Modals/EditDanceMoveModal';
import DeleteModal from './components/Modals/DeleteModal';

import './App.scss'


export default class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       danceMoveList: [],
     }
     this.handleEditDanceMove = this.handleEditDanceMove.bind(this)
     this.handleDeleteDanceMove = this.handleDeleteDanceMove.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      addModalOpen: false,
      deleteDanceModalOpen: false,
    })
    this.refreshList()
  }

  refreshList() {
    axios
    .get("http://localhost:8000/api/dancemoves/")
    .then(res => this.setState({ danceMoveList: res.data }))
    .catch(err => console.log(err));
  }

  handleDeleteDanceMove(id) {
    console.log('Delete clicked')
    console.log('Id: ', id)
    // Takes in dance move id and deletes based on Django delete
    axios
    .delete(`http://localhost:8000/api/dancemoves/${id}`) 
    .then(res => this.refreshList());
  }

  handleEditDanceMove(danceMove) {
    console.log('Dance move updated: ', danceMove)
    if (danceMove.id) {
      axios
        .put(`http://localhost:8000/api/dancemoves/${danceMove.id}/`, danceMove)
        .then(res => this.refreshList());
      return;
    }
    else {
      axios
        .post("http://localhost:8000/api/dancemoves/", danceMove)
        .then(res => this.refreshList());
    }
  }

  renderCard(danceMove) {
    return(
        <Card key={danceMove.id}>
          <CardTitle>{danceMove.name}</CardTitle>
          <CardBody>
            <CardText>
              {danceMove.description ? danceMove.description : 'No description available'}
            </CardText>
            <div className="button-container">
              <div className="button">
                <Button 
                  onClick={this.handleAddToRoutineButton}
                >
                  Add To Routine
                </Button>
              </div>
              <div className="button">
                <EditDanceMoveModal danceMove={danceMove} onSave={this.handleEditDanceMove} label={`Edit`} />
              </div>
              <div className="button">
                {this.renderDeleteDanceModal(danceMove)}
              </div>
            </div>
          </CardBody>
        </Card>

    )
  }

  handleAddToRoutineButton() {
    //Will open modal to add to a routine 
    console.log('Add to Routine Button Clicked')
  }

  renderAddModal() {
    let open = () => {
      console.log('Add Model Opened')
      this.setState({addModalOpen: true})
    }

    let close = () => {
      this.setState({addModalOpen: false})
      this.refreshList()
    }

    return(
      <React.Fragment>
        <DropdownItem onClick={open}>Add Move</DropdownItem>
        <AddDanceModal 
          isOpen={this.state.addModalOpen} 
          close={close} 
          onSave={this.handleEditDanceMove}
          label={'Add '}
          />
        {/* <ModalTemplate id="add-move-modal" isOpen={this.state.addModalOpen}>
          Testing this method
          <Button onClick={close}>Close</Button>
        </ModalTemplate> */}
      </React.Fragment>
    )
  }

  renderDeleteDanceModal(danceMove) {
    let open = () => {
      console.log('Delete Dance Moodal rendered')
      this.setState({deleteDanceModalOpen: true})
    }
  
    let close = () => {
      this.setState({deleteDanceModalOpen: false})
    }

    return(
      <React.Fragment>
        <Button onClick={open}>Delete</Button>
        <DeleteModal 
          isOpen={this.state.deleteDanceModalOpen} 
          close={close} 
          onDelete={this.handleDeleteDanceMove}
          label={danceMove.name}
          id={danceMove.id}
          />
      </React.Fragment>
    )
  }

  render() {
    return(
      <div className="container-wrapper">
        <Navbar color="light">
          <NavbarBrand>
            Belly Dance Moves
          </NavbarBrand> 
          <div className="dropdown-container">
            <UncontrolledDropdown >
              <DropdownToggle>
                Dance Moves
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Find Move 
                </DropdownItem>
                {this.renderAddModal()}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown >
              <DropdownToggle>
                Routines
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  View Routines
                </DropdownItem>
                <DropdownItem>
                  Create Routine
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Navbar>
        <div className="container">
            {this.state.danceMoveList.map((danceMove) => 
              this.renderCard(danceMove)
            )}
        </div>
      </div>
    );
  }
}