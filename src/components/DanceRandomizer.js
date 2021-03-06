import React from 'react';
import axios from 'axios';
import { FormGroup, Input, Label, Table } from 'reactstrap';
import Button from './styled_components/Button';
import { randomizeList, generateRepititions } from '../utils/helpers';

import './styles/DanceRandomizer.scss';
/*
TODO: Allow user to enter any number of moves. This would reuse certain moves.
TODO: Allow user to delete move from list.
*/

export default class DanceRandomizer extends React.Component {
    constructor() {
        super();

        this.state = {
           danceMoveList: ['Omi', 'Shimmy', 'Camel'],
           number: 4,
           randomizedDanceList: [],
        }    
     
        this.renderForm = this.renderForm.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onRandomizeClick = this.onRandomizeClick.bind(this);
    }

    refreshList() {
        axios
        .get("http://localhost:8000/api/dancemoves/")
        .then(res => this.setState({ danceMoveList: res.data }), console.log('Set state hit'))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.refreshList()
    }

    onNumberChange = (e) => {
        e.preventDefault();
        this.setState({
            number: e.target.value,
        })
    }

    onRandomizeClick() {
        //Note: If you console log state right after clicking, it will not render correctly since setState is async
        const { danceMoveList, number, randomizedDanceList } = this.state

        let updatedRandomizedDanceList = randomizeList(danceMoveList).slice(0, number)
        this.setState({
            randomizedDanceList: updatedRandomizedDanceList,
        })
        console.log(randomizedDanceList)
    }

    renderForm() {
        const { danceMoveList } = this.state;
        return (
            <div className="form">
                 <FormGroup>
                 <Label for="numberOfMoves">Number of Moves (Enter between 1 - {danceMoveList.length}):</Label>
                    <Input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="number placeholder"
                    onChange={this.onNumberChange}
                    />                
                 </FormGroup>
                <Button 
                  primary
                  onClick={() => this.onRandomizeClick()}>
                  Randomize
                </Button>
            </div>
        );
    }

    renderDanceMoveTable() {
        const { randomizedDanceList } = this.state;
        return (
            <div className="table">
                <Table>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Dance Move</th>
                            <th>Repetitions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {randomizedDanceList.map((danceMove, index) => (
                                <tr key={danceMove.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{danceMove.name}</td>
                                    <td>{generateRepititions()}</td>
                                </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {
        const {randomizedDanceList} = this.state;
        return(
            <div className="container">
                {this.renderForm()}
                {randomizedDanceList.length > 0 && this.renderDanceMoveTable()}
            </div>
        );
    }
}