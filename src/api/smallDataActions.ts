import { getSmallDataAC, setPeopleAC } from './../redux/smallDataReducer';
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

export const setPeopleTC = (
    id:number, firstName: string, lastName: string, email: string, phone: string,
    address:{ streetAddress: string, city: string, state: string, zip: string  }, description: string
) => (dispatch:Dispatch) => {
    dispatch(loaderAC(true))
    axios.post(`${baseUrl}`, {
        id, firstName, lastName, email, phone, address, description
    })
    .then((response) => {
        dispatch(setPeopleAC(response.data))
    }).catch((error) => {
        console.log(error.message)
    }).finally(() => {
        dispatch(loaderAC(false))
    })
}
