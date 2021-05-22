import { serviceReducer } from './serviceReducer';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { smallDataReducer } from './smallDataReducer'

const rootReducer = combineReducers({
    smallData: smallDataReducer,
    service: serviceReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>