import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { fetchResults } from "../redux/actionCreators";
import Header from "./HeaderCompenent";
import Home from "./HomeComponent";
import Results from './ResultsComponent';

const mapStateToProps = (state) => {
    return {
        results: state.results
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchResults: () => {dispatch(fetchResults())}
})


class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const fetchResults = () => {
            return <Results results = {this.state.results} />
        }

        return(
            <>
            <Header/>
            <Switch>
                <Route path="/home" component={() => <Home fetchResults={this.props.fetchResults} />} />
                <Route path="/results/:query" component={Results} />
                <Redirect to ="/home" />
            </Switch>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));