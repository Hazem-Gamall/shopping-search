import * as actionTypes from './actionTypes';

export const Results = (state = {
    isLoading: false,
    errMess: null,
    results:[]}, action) => {
    switch(action.type){
        case actionTypes.ADD_RESULTS:
            return {...state, errMess: null, isLoading: false, results: action.payload};
        case actionTypes.RESULTS_LOADING:
            return {...state, errMess: null, isLoading: true, results: []};
        case actionTypes.RESLULTS_FAILED:
            return {...state, errMess: action.payload, isLoading: false, results: []};
        default:
            return state;
    }
    }