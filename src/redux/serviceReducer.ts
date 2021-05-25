
const initState:InitStateType = {
    loader: false,
    activePage: 0
}

type InitStateType = {
    loader: boolean
    activePage: number
}

export const serviceReducer = (state:InitStateType = initState, action:ActionType) => {
    switch(action.type){
        case 'LOADER':{
            return {...state, loader : action.loader}
        }
        case 'CHANGE_ACTIVE_PAGE':{
            return {...state, activePage : action.page}
        }
        default: return state
    }
}

export const loaderAC = (loader:boolean) => ({type:'LOADER', loader})
type LoaderType = ReturnType<typeof loaderAC>

export const changeActivePageAC = (page:number) => ({type: 'CHANGE_ACTIVE_PAGE', page})
export type ChangeActivePageType = ReturnType<typeof changeActivePageAC>

type ActionType = LoaderType & ChangeActivePageType