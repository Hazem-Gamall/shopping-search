import * as actionTypes from './actionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchResults = () => (dispatch) => {
    dispatch(resultsLoading())

    return fetch(baseUrl + 'results')
            .then(response => {
                if(response.ok){
                    return response;
                }else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
            .then(response => response.json())
            .then(results => dispatch(addResults(results)))
            .catch(error => dispatch(resultsFailed(error.message)));
            
}

export const resultsLoading = () => ({
    type: actionTypes.RESULTS_LOADING,
});

export const addResults = (results) => ({
    type: actionTypes.ADD_RESULTS,
    payload: results
});

export const resultsFailed = (errMess) => ({
    type: actionTypes.RESLULTS_FAILED,
    payload: errMess
});