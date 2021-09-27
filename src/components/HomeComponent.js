import React, { Component } from "react";
import { LocalForm, Control } from "react-redux-form";
import {Card, CardBody, CardTitle, CardText, CardHeader, FormGroup, Label, Button} from 'reactstrap';

class Home extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (query) => {
        alert(JSON.stringify(query));
        console.log(query);
        window.location = 'results';
    }
    render()
    {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 m-auto mt-3">
                        <Card>
                            <CardHeader>
                                <h2>Test</h2>
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    <LocalForm onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <Label htmlFor="query">Enter your search query!</Label>
                                            <Control.text className="form-control" model='.query' name='query' id='query'/>
                                        </FormGroup> 
                                        <FormGroup className='mt-2'>
                                            <Button type="submit" className = "bg bg-primary">Search</Button>
                                        </FormGroup>
                                    </LocalForm>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;