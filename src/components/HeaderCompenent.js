import React, {Component} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';

class Header extends Component{
    constructor(props){
        super(props);

        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({isNavOpen: !this.state.isNavOpen});
    }

    render(){
        return(
            <div>
                <Navbar color='primary'dark expand='md' sticky>
                    <div className="container">
                        <NavbarBrand className="mr-auto " href="/home">Brand</NavbarBrand>                    
                        <NavbarToggler onClick={this.toggleNav}/>
                        <Collapse navbar isOpen={this.state.isNavOpen}>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/home">
                                        <span className="fa fa-home fa-lg">Home</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    
    }
}

export default Header;