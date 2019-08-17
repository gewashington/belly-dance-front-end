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
import {ModalTemplate} from './components/Modals/ModalTemplate';

import EditDanceMoveModal from './components/Modals/EditDanceMoveModal';

import './App.scss'
export default class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       danceMoveList: [],
     }
     this.handleEdit = this.handleEdit.bind(this)
  }
  
  componentDidMount() {
    this.refreshList()
  }

  refreshList() {
    axios
    .get("http://localhost:8000/api/dancemoves/")
    .then(res => this.setState({ danceMoveList: res.data }))
    .catch(err => console.log(err));
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
                <EditDanceMoveModal danceMove={danceMove} onSave={this.handleEdit} label={`Edit`} />
              </div>
              <div className="button">
                <Button 
                  onClick={() => this.handleDelete(danceMove.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

    )
  }

  handleDelete(id) {
    console.log('Delete clicked')
    console.log('Id: ', id)
    //Takes in dance move id and deletes based on Django delete
    axios
    .delete(`http://localhost:8000/api/dancemoves/${id}`)
    .then(res => this.refreshList());
  }

  handleAddToRoutineButton() {
    //Will open modal to add to a routine 
    console.log('Add to Routine Button Clicked')
  }

  handleEdit(danceMove) {
    console.log('Dance move updated: ', danceMove)
    if (danceMove.id) {
      axios
        .put(`http://localhost:8000/api/dancemoves/${danceMove.id}/`, danceMove)
        .then(res => this.refreshList());
      return;
    }
    // axios
    //   .post("http://localhost:8000/api/dancemoves/", danceMove)
    //   .then(res => this.refreshList());
  }


  renderAddModal() {
    return(
      <React.Fragment>
        <DropdownItem onClick={ModalTemplate.open('add-move-modal')}>Add Move</DropdownItem>
        <ModalTemplate id="add-move-modal">
          Testing this method
          <Button onClick={ModalTemplate.close('add-move-modal')}>Close</Button>
        </ModalTemplate>
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