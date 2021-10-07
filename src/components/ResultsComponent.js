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
    if(results.length < 1){
        return(<h1 className='text-danger'>Website Unavilable</h1>);
    }
    return results.map((result)=> {
        return(
                    <Card className="result-card col-12 col-md-5 rounded border" key = {result.id}>
                        <a href={result.url}>
                        <CardHeader className="text-center res-card-header" title={result.title}>
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
        this.props.dispatch(fetchResults(
            {
                query:this.props.match.params.query,
                sort:this.props.match.params.sort
            }));
    }

    
    render(){
        if(this.props.loading){
            return(
                <div className='container'>
                    <div className='row loading'>
                            <Loading />
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
                        <CardGroup className='flex-nowrap'>
                            <RenderResults results = {this.props.results.amazon} />
                        </CardGroup>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <h1>Jumia</h1>
                        <CardGroup className="flex-nowrap">
                            <RenderResults results = {this.props.results.jumia} />
                        </CardGroup>
                    </div>
                    
                </div>
                </>
        );
    }
}

export default connect(mapStateToProps)(Results);