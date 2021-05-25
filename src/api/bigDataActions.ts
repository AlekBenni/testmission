import axios from 'axios'
import {Dispatch} from 'redux'
import { getBigDataAC, setPeopleBigAC } from '../redux/bigDataReducer';
import { loaderAC } from '../redux/serviceReducer';

const baseUrl = "http://localhost:5000/big"

export const getBigDataTC = () => (dispatch:Dispatch) => {
    dispatch(loaderAC(true))
    axios.get(`${baseUrl}`)
    .then((response) => {
        dispatch(getBigDataAC(response.data))
    }).catch((error) => {
        console.log(error.message)
    }).finally(() => {
        dispatch(loaderAC(false))
    })
}

export const setPeopleBigTC = (
    id:number, firstName: string, lastName: string, email: string, phone: string,
    address:{ streetAddress: string, city: string, state: string, zip: string  }, description: string
) => (dispatch:Dispatch) => {
    dispatch(loaderAC(true))
    axios.post(`${baseUrl}`, {
        id, firstName, lastName, email, phone, description, address
    })
    .then((response) => {
        dispatch(setPeopleBigAC(response.data))
    }).catch((error) => {
        console.log(error.message)
    }).finally(() => {
        dispatch(loaderAC(false))
    })
}
