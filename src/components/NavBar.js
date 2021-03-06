import React from 'react';
import { Link } from 'react-router-dom';
import { 
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    Navbar,
    NavbarBrand,
    UncontrolledDropdown,
} from 'reactstrap';

import styles from './styles/NavBar.scss'

export default function NavBar(props) {
        return(
            <div className="container-wrapper">
                <Navbar className="nav-bar">
                    <NavbarBrand className="nav-brand">
                      <Link to="/"> 
                        <span className="title">
                          Belly Dance Moves
                        </span>
                      </Link>
                    </NavbarBrand> 
                    <div className="dropdown-container">
                    <UncontrolledDropdown>
                        <DropdownToggle color="F35860">
                          <span className="dance-moves-dropdown-button">Dance Moves</span>
                        </DropdownToggle>
                        <DropdownMenu right color="F35860">
                            <DropdownItem>
                                <Link to="/">View List</Link>
                            </DropdownItem>
                            {props.renderAddModal()}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown >
                        <DropdownToggle color="F35860">
                          Routines
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>
                            <Link to="randomizer">Create Random Routine</Link>
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </div>
                </Navbar>
            </div>
        );
    }