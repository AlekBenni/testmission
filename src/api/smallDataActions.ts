import { getSmallDataAC } from './../redux/smallDataReducer';
import axios from 'axios'
import {Dispatch} from 'redux'
import { loaderAC } from '../redux/serviceReducer';

const baseUrl = "http://localhost:5000/small"

export const getSmallDataTC = () => (dispatch:Dispatch) => {
    dispatch(loaderAC(true))
    axios.get(`${baseUrl}`)
    .then((response) => {
        dispatch(getSmallDataAC(response.data))
    }).catch((error) => {
        console.log(error.message)
    }).finally(() => {
        dispatch(loaderAC(false))
    })
}
