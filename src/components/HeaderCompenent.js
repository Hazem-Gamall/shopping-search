import React, { Component } from "react";
import { Control, LocalForm } from "react-redux-form";
import { withRouter } from 'react-router-dom';
import { Collapse, Jumbotron, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            isNavOpen: false,
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    handleSubmit = ({ query }) => {
        console.log("query:" + JSON.stringify(query));
        if (query !== undefined) {
            this.props.history.push(`/results/${query}`)
            this.props.history.go();
        }
    }

    render() {
        return (
            <>
            <Navbar dark expand='md' className="sticky-top" >
                <div className='container'>

                    <NavbarBrand className="mr-auto" href="/home">
                        <span className="fa fa-search fa-small"></span>
                    </NavbarBrand>

                    <Collapse navbar isOpen={this.state.isNavOpen}>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                {/* <NavLink to="/home">
                                        <span className="fa fa-home fa-lg">Home</span>
                                    </NavLink> */}
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <div className="row nowrap">
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div class="input-group col-12 col-md-12">
                                <div class="form-outline">
                                    <Control.text model='.query' type="search" placeholder='search' id="form1" class="form-control" />
                                </div>
                                <button type="submit" class="btn btn-success">
                                    <i class="fa fa-search"></i>
                                </button>

                            </div>
                        </LocalForm>
                    </div>
                    <NavbarToggler onClick={this.toggleNav} />

                </div>
            </Navbar>

            <Jumbotron>
                <div className='container'>
                    <div className='row row-header'>
                        <div className='col-12 col-md-6'>
                            <h1>Search For Me</h1>
                            <p>Search for me is a simple website that allows you to search for a certian product on multiple pre-set websites at the same time.</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            </>
        );

    }
}

export default withRouter(Header);