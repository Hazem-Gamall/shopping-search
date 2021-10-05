import React, { Component } from "react";
import { LocalForm, Control } from "react-redux-form";
import {Redirect, NavLink} from 'react-router-dom';
import {Card, CardBody, CardTitle, CardText, CardHeader, FormGroup, Label, Button} from 'reactstrap';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleRedirect = this.toggleRedirect.bind(this);
    }
    handleSubmit = (query) => {
        this.setState({query: query.query});
        this.toggleRedirect(); 
        console.log(JSON.stringify(this.state));

    }

    toggleRedirect(){
        this.setState({redirect: true});
    }
    render()
    {
        if(this.state.redirect){
            console.log(JSON.stringify(this.state))
            return(
                <Redirect to ={`/results/${this.state.query}`} />
            )
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 m-auto mt-3">
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Home;