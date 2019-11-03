import React from 'react';
import axios from 'axios';
import EditDanceMoveModal from './Modals/EditDanceMoveModal';
import DeleteModal from './Modals/DeleteModal';
import styles from './styles/BellyDanceMoveList.scss'

/*
! Fix Delete Move Function
*/

import { 
    Button, 
    Card, 
    CardBody,
    CardTitle, 
    CardText, 
    } from 'reactstrap';

export default class BellyDanceMoveList extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
           danceMoveList: [],
         }
         this.handleEditDanceMove = this.handleEditDanceMove.bind(this)
         this.handleDeleteDanceMove = this.handleDeleteDanceMove.bind(this);
         this.renderCard = this.renderCard.bind(this);
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
        .then(res => this.setState({ danceMoveList: res.data }), console.log('Set state hit'))
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
            <Card key={danceMove.id} style={cardStyle}>
              <CardTitle className="card-title">{danceMove.name}</CardTitle>
              <CardBody className="card-body">
                <CardText>
                  {danceMove.description ? danceMove.description : 'No description available'}
                </CardText>
                <div className="button-container">
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
              <div className="card-container">
                {this.state.danceMoveList.map((danceMove) => 
                this.renderCard(danceMove))}
              </div>
          );
      }


}

const cardStyle = {
  "width": "300px",
  "backgroundColor": "#F35860",
  "borderColor": "white"
}