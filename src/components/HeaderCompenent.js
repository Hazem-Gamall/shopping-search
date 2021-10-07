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

    handleSubmit = (values) => {
        console.log("query:" + JSON.stringify(values));
        const isSort = !values.sort || values.sort ===undefined? 'false' : 'true';
        if (values.query !== undefined) {
            this.props.history.push(`/results/${values.query}&${isSort}`)
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
                <div className='container justify-content-start'>
                    <div className='row'>
                        <div className='col-1'>
                            <NavbarBrand className="" href="/home">
                                <span className="fa fa-search fa-small"></span>
                            </NavbarBrand>
                        </div>
                        <div className='col-11'>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <div class="input-group">
                                    <div class="row form-outline flex-nowrap">

                                        <div className='col-8 col-md-auto d-flex flex-nowrap'>
                                            <Control.text model='.query' type="search" placeholder='search' class="form-control" />
                                            <button type="submit" class="btn btn-success rounded">
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </div>

                                        <div className='col-4 col-md-auto d-flex align-items-center'>
                                            <label htmlFor='sort-check' className='form-check-label' id='sort-check-label'>Sort?</label>
                                            <Control.checkbox model='.sort' className=' form-check-input m-2' id='sort-check' checked ></Control.checkbox>
                                        </div>
                                    </div>
                                </div>
                            </LocalForm>
                        </div>

                    </div>
                </div>
            </Navbar>
        );

    }
}

export default withRouter(Header);