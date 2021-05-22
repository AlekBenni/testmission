import React from 'react'
import {Route} from 'react-router-dom'
import BigDataContainer from './big_data/BigDataContainer'
import SmallDataContainer from './small_data/SmallDataContainer'

function RouteComponent() {
    return (
            <div>
                <Route path="/big" render = {() => <BigDataContainer/> } />
                <Route path="/small" render = {() => <SmallDataContainer/> } />
            </div>
    )
}

export default RouteComponent
