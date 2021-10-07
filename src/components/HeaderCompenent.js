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
            isHome: false
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

    componentDidMount() {
        if (this.props.history.location.pathname === '/home') {
            this.setState({ isHome: true });
        } else {
            this.setState({ isHome: false });
        }
    }

    render() {
        return (
            <Navbar dark expand='md' className="sticky-top" >
                <div className='container justify-content-around'>

                    <NavbarBrand className="mr-5" href="/home">
                        <span className="fa fa-search fa-small"></span>
                    </NavbarBrand>

                    <div className='row'>
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

                </div>
            </Navbar>
        );

    }
}

export default withRouter(Header);