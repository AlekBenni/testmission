import { serviceReducer } from './serviceReducer';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { smallDataReducer } from './smallDataReducer'
import { bigDataReducer } from './bigDataReducer';

export const rootReducer = combineReducers({
    smallData: smallDataReducer,
    bigData: bigDataReducer,
    service: serviceReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>