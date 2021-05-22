import React from 'react'
import {NavLink} from 'react-router-dom'

function Choose() {
    return (
        <div className="wrap">
            <h1>Hello choose</h1>
            <NavLink to="/small" >Small Data</NavLink>
            <NavLink to="/big" >Big Data</NavLink>
        </div>
    )
}

export default Choose



