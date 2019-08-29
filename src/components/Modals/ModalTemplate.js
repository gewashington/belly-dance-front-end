import React from 'react';
import PropTypes from 'prop-types';
import {ModalTemplateContainer} from './ModalTemplateContainer';
import './styles/ModalTemplate.scss';

const propTypes = {
    id: PropTypes.string.isRequired
};

class ModalTemplate extends React.Component {
    // static modals = [];

    // static open = (id) => (e) => {
    //     console.log(id)
    //     e.preventDefault();

    //     // open modal specified by id
    //     let modal = ModalTemplate.modals.find(x => x.props.id === id);
    //     modal.setState({ isOpen: !modal.state.issOpen }, console.log('Modal:', modal));
    //     // console.log(modal)
    //     document.body.classList.add('modal-template-open');
    // }

    // static close = (id) => (e) => {
    //     e.preventDefault();

    //     // close modal specified by id
    //     let modal = ModalTemplate.modals.find(x => x.props.id === id);
    //     modal.setState({ isOpen: false });
    //     document.body.classList.remove('modal-template-open');
    // }

    constructor(props) {
        super(props);

        this.state = { isOpen: false };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // add this modal instance to the modal service so it's accessible from other components
        console.log('Modal List Before CDM', ModalTemplateContainer.modals)
        ModalTemplateContainer.modals.push(this);
        console.log('Modal List After CDM', ModalTemplateContainer.modals)

    }

    componentWillUnmount() {
        // remove this modal instance from modal service
        ModalTemplateContainer.modals = ModalTemplateContainer.modals.filter(x => x.props.id !== this.props.id);
        this.element.remove();
    }
    
    handleClick(e) {
        // close modal on background click
        if (e.target.className === 'modal-template') {
            console.log('Handle Close Click Works', this.props.id, e)
            ModalTemplateContainer.close(this.props.id)(e);
        }
    }

    render() {
        return (
            <div className={`${this.props.id}`} style={{display: + this.props.isOpen ? '' : 'none'}} onClick={this.handleClick} ref={el => this.element = el}>
                <div className="modal-template">
                    <div className="modal-template-body">
                        {this.props.children}
                    </div>
                </div>
                {/* <div className="jw-modal-background"></div> */}
            </div>
        );
    }
}

ModalTemplate.propTypes = propTypes;

export { ModalTemplate };