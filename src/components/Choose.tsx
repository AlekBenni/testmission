import React from 'react'
import {NavLink} from 'react-router-dom'

function Choose() {
    return (
        <div className="choose wrap">
            <h1>Wellcome</h1>
            <p>Choose your array of Data</p>
            <div className="link-block">
                <NavLink to="/small" >
                    <div className="circle"> <span>S</span> </div>
                    <p>Small Data</p>
                </NavLink>
                <NavLink to="/big" >
                    <div className="circle"> <span>B</span> </div>
                    <p>Big Data</p>
                </NavLink>
            </div>

        </div>
    )
}

export default Choose



