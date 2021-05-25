
const initState:InitStateType = {
    bigData: [],
}

type InitStateType = {
    bigData: Array<BigDataType>
}

export type BigDataType = {
    _id: string
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    address: AddressType
    description: string
}

type AddressType = {
    streetAddress: string
    city: string
    state: string
    zip: string   
}

export const bigDataReducer = (state:InitStateType = initState, action:ActionType) => {
    switch(action.type){
        case 'GET_BIG_DATA':{
            return {...state, bigData : action.data}
        }        
        case 'SET_PEOPLE_BIG':{
            let stateCopy = {...state}
            stateCopy.bigData = [...stateCopy.bigData]
            stateCopy.bigData.unshift(action.newData)
            return stateCopy
        }
        default: return state
    }
}

export const getBigDataAC = (data:BigDataType) => ({type: 'GET_BIG_DATA', data})
type GetBigDataType = ReturnType<typeof getBigDataAC>

export const setPeopleBigAC = (newData:BigDataType) => ({type: 'SET_PEOPLE_BIG', newData})
type SetPeopleBigType = ReturnType<typeof setPeopleBigAC>

type ActionType = GetBigDataType & SetPeopleBigType