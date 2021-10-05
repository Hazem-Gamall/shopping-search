import React, { Component } from "react";
import {connect} from 'react-redux';
import { Card, CardBody, CardDeck, CardGroup, CardHeader, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { fetchResults } from "../redux/actionCreators";
import {Loading} from './LoadingComponent';

const mapStateToProps = (state) => {
    return ({
        results: state.results,
        loading: state.isLoading,
        error: state.errMess,
        duration: state.duration
        });
}

const RenderResults = ({results}) => {
    return results.map((result)=> {
        return(
                    <Card className="result-card col-6 col-md-3" key = {result.id}>
                        <a href={result.url}>
                        <CardHeader className="text-center bg-warning search-rs-header" title={result.title}>
                            {result.title}
                        </CardHeader>
                        
                        <CardBody>
                            <CardTitle>{result.price}</CardTitle>
                            <CardImg top src={result.image} />
                        </CardBody>
                        </a>
                    </Card>
        );
    })


}


class Results extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }
    
    componentDidMount(){
        this.props.dispatch(fetchResults(this.props.match.params.query));
    }

    
    render(){
        if(this.props.loading){
            return(
                <div className='container'>
                    <div className='row loading'>
                        <div className='col-12'>
                            <Loading />
                        </div>
                    </div>
                </div>
            );
        }else if(this.props.error){
            return(
                <h1>{this.props.error}</h1>
            );
        }else if(this.props.results.length < 1 || this.props.results === undefined){
            return<h1>Results array is empty</h1>
        }
        else
            return(
                <>
                {console.log("time taken: " + this.props.duration)}
                <div className="container">
                    <div className="row">
                        <h1>Amazon</h1>
                        <CardGroup className='d-flex flex-row flex-nowrap'>
                            <RenderResults results = {this.props.results.amazon} />
                        </CardGroup>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <h1>Jumia</h1>
                        <CardGroup className="d-flex flex-row flex-nowrap">
                            <RenderResults results = {this.props.results.jumia} />
                        </CardGroup>
                    </div>
                    
                </div>
                </>
        );
    }
}

export default connect(mapStateToProps)(Results);