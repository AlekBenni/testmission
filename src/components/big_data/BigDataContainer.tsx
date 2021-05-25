import React from 'react'
import {useSelector} from 'react-redux'
import { BigDataType } from '../../redux/bigDataReducer'
import { RootStateType } from '../../redux/store'
import BigData from './BigData'

function BigDataContainer() {
    //@ts-ignore
    const bigData = useSelector((state:RootStateType) => state.bigData.bigData)
    const loader = useSelector((state:RootStateType) => state.service.loader)

    if(loader){
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div>
            <BigData data={bigData} />
        </div>
    )
}

export default BigDataContainer
