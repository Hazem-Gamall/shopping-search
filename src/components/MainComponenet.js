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

    componentDidMount(){
        this.props.fetchResults();
    }

    render(){
        return(
            <>
            <Header/>
            <Switch>
                <Route path="/" component={Home} />
                <Route exact path="/results" component={Results} />
                <Redirect to ="/home" />
            </Switch>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));