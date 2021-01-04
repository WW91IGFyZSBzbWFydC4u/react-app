import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from "tabler-react";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.onClick = this.props.onClick;
        this.active = '/overview';
    }

    setActive(elem) {
        
    }

    render() {
        return (
            <Nav 
            items={
            <React.Fragment>
                <Nav.Item active to="/overview" value="Overview" icon="globe"/>
                <Nav.Item to="/wallet" value="Wallet" icon="credit-card"/>
                <Nav.Item to="/profile" value="Profile" icon="user" />
                <Nav.Item to="/" value="Logout" onClick={() => this.onClick()} icon="log-out"/>
            </React.Fragment>
            }
        />);
    }
}

export default Navbar;