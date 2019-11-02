import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import DanceRandomizer from './components/DanceRandomizer';
import BellyDancemoveList from './components/BellyDanceMoveList';
import { 
DropdownItem,
DropdownToggle,
DropdownMenu,
Navbar,
NavbarBrand,
UncontrolledDropdown,
} from 'reactstrap';

import AddDanceModal from './components/Modals/AddDanceMoveModal';
import './App.scss'


export default class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       danceMoveList: [],
     }
     this.handleSaveDanceMove = this.handleSaveDanceMove.bind(this)
  }
  
  componentDidMount() {
    // this.setState({
    //   addModalOpen: false,
    //   deleteDanceModalOpen: false,
    // })
    this.refreshList()
  }

  refreshList() {
    axios
    .get("http://localhost:8000/api/dancemoves/")
    .then(res => this.setState({ danceMoveList: res.data }))
    .catch(err => console.log(err));
  }

  handleSaveDanceMove(danceMove) {
      axios
        .post("http://localhost:8000/api/dancemoves/", danceMove)
        .then(res => this.refreshList());
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
          onSave={this.handleSaveDanceMove}
          label={'Add '}
          />
        {/* <ModalTemplate id="add-move-modal" isOpen={this.state.addModalOpen}>
          Testing this method
          <Button onClick={close}>Close</Button>
        </ModalTemplate> */}
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
                  <Link to="/">View List</Link>
                </DropdownItem>
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
                  <Link to="randomizer">Create Random Routine</Link>
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Navbar>
        <div className="container">
            <React.Fragment>
              <Switch>
                <Route exact path="/" component={BellyDancemoveList}/>
                <Route path="/randomizer" component={DanceRandomizer} />`
              </Switch>
            </React.Fragment>
        </div>
      </div>
    );
  }
}