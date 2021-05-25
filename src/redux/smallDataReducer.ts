
const initState:InitStateType = {
    smallData: [],
}

type InitStateType = {
    smallData: Array<SmallDataType>
}

export type SmallDataType = {
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

export const smallDataReducer = (state:InitStateType = initState, action:ActionType) => {
    switch(action.type){
        case 'GET_SMALL_DATA':{
            return {...state, smallData : action.data}
        }
        case 'SET_PEOPLE':{
            let stateCopy = {...state}
            stateCopy.smallData = [...stateCopy.smallData]
            stateCopy.smallData.unshift(action.newData)
            return stateCopy
        }
        default: return state
    }
}

export const getSmallDataAC = (data:SmallDataType) => ({type:'GET_SMALL_DATA', data})
type GetSmallDataType = ReturnType<typeof getSmallDataAC>

export const setPeopleAC = (newData:SmallDataType) => ({type:'SET_PEOPLE', newData})
type SetPeopleType = ReturnType<typeof setPeopleAC>

type ActionType = GetSmallDataType & SetPeopleType