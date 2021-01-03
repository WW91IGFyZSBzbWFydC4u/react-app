import React from 'react';
import { Nav } from "tabler-react";

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.onClick = this.props.onClick;
    }
    render() {
        return (
            <Nav
            items={
            <React.Fragment>
            <Nav.Item active value="Overview" icon="globe"/>
            <Nav.Item value="Wallet" icon="credit-card"/>
            <Nav.Item value="Profile" icon="user" />
            <Nav.Item value="Logout" onClick={() => this.onClick()} icon="log-out"/>
            </React.Fragment>
            }
        />);
    }
}

export default Navbar;