/* 
TODO: Fix color of Add Move Dropdown Item
TODO: Extract Add Move Modal 
*/

import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { Alert, DropdownItem } from 'reactstrap';

import AddDanceModal from './components/Modals/AddDanceMoveModal';
import BellyDancemoveList from './components/BellyDanceMoveList';
import DanceRandomizer from './components/DanceRandomizer';
import NavBar from './components/NavBar';


import './App.scss'


export default class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       danceMoveList: [],
     }
     this.handleSaveDanceMove = this.handleSaveDanceMove.bind(this);
     this.renderAddModal = this.renderAddModal.bind(this);
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
      <div className="container">
         {/* <Alert color="primary">
          Testing alert to test CSS
        </Alert> */}
        <NavBar renderAddModal={this.renderAddModal} />
        <div>
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