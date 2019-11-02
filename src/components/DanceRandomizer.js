import React from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Label, Table } from 'reactstrap';
import { randomizeList, generateRepititions } from '../utils/helpers';
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
        this.setState({
            number: e.target.value,
        })
    }

    onRandomizeClick() {
        //Note: If you console log state right after clicking, it will not render correctly since setState is async
        const { danceMoveList, number } = this.state
        let updatedRandomizedDanceList = randomizeList(danceMoveList).slice(0, number)
        this.setState({
            randomizedDanceList: updatedRandomizedDanceList,
        })
    }

    renderForm() {
        return (
            <React.Fragment>
                 <FormGroup>
                 <Label for="numberOfMoves">Enter How Many Moves</Label>
                    <Input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="number placeholder"
                    onChange={this.onNumberChange}
                    />                
                 </FormGroup>
                <Button 
                  color="primary"
                  onClick={() => this.onRandomizeClick()}>
                  Randomize
                </Button>
            </React.Fragment>
        );
    }

    renderDanceMoveTable() {
        const { randomizedDanceList } = this.state;
        return (
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
        )
    }

    render() {
        const {randomizedDanceList} = this.state;
        return(
            <div>
                {this.renderForm()}
                {randomizedDanceList.length > 0 && this.renderDanceMoveTable()}
            </div>
        );
    }
}