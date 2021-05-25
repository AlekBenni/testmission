import React from 'react'
import SmallData from './SmallData'
import {useSelector} from 'react-redux'
import { RootStateType } from '../../redux/store'
import { SmallDataType } from '../../redux/smallDataReducer'

function SmallDataContainer() {
    //@ts-ignore
    const smallData = useSelector((state:RootStateType) => state.smallData.smallData)
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
            <SmallData data={smallData} />
        </div>
    )
}

export default SmallDataContainer
