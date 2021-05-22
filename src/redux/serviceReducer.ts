
const initState:InitStateType = {
    loader: false
}

type InitStateType = {
    loader: boolean
}

export const serviceReducer = (state:InitStateType = initState, action:ActionType) => {
    switch(action.type){
        case 'LOADER':{
            return {...state, loader : action.loader}
        }
        default: return state
    }
}

export const loaderAC = (loader:boolean) => ({type:'LOADER', loader})
type LoaderType = ReturnType<typeof loaderAC>

type ActionType = LoaderType