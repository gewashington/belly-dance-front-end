import React from 'react';
// import {ModalTemplate} from './ModalTemplate';

class ModalTemplateContainer extends React.Component {

    static modals = [];

    static open = (id) => (e) => {
        // console.log(id)
        e.preventDefault();
        // open modal specified by id
        document.body.classList.add('modal-template-open');
        let modal = ModalTemplateContainer.modals.find(x => x.props.id === id);

        console.log(modal.state)
        modal.isOpen = true
        // modal.setState({ isOpen: true }, console.log('Modal:', modal.props));
        // console.log(modal)
    }

    static close = (id) => (e) => {
        e.preventDefault();

        // close modal specified by id
        document.body.classList.remove('modal-template-open');
        let modal = ModalTemplateContainer.modals.find(x => x.props.id === id);
        modal.setState({ isOpen: false });
    }

}

// ModalTemplateContainer.propTypes = propTypes;

export { ModalTemplateContainer }