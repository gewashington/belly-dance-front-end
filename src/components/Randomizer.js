import React from 'react';

export default class DanceRandomizer extends React.Component {
    constructor() {
        super();

        this.state = {

        }    
        this.renderForm = this.renderForm.bind(this)
    }

    renderForm() {
        return 'Show form here'
    }

    render() {
        return(
            <div>
                This is the Randomizer
                {this.renderForm()}
            </div>
        );
    }

}