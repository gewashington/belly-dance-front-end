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

export default function NavBar(props) {
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
                        {props.renderAddModal()}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown >
                        <DropdownToggle>
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