import React from 'react'
import { SmallDataType } from '../redux/smallDataReducer'

type PropsType = {
    peopleId: number
    data: Array<SmallDataType>
}

function PeopleInfoLittle(props:PropsType) {
    let people = props.data.filter(item => item.id === props.peopleId)
    const resultPeople = people.map((item:SmallDataType, index:number) => {
        return(
            <div className="people-info-little" key={index}>
                <p> <span>First name:</span> {item.firstName}</p>
                <p> <span>Last name:</span> {item.lastName}</p>
                <p> <span>Email:</span> {item.email}</p>
                <p> <span>Phone:</span> {item.phone}</p>
                <p> <span>Description:</span> {item.description}</p>
                <h5> <span>His address:</span> </h5>
                <p> <span>StreetAddress:</span> {item.address.streetAddress}</p>
                <p> <span>City:</span> {item.address.city}</p>
                <p> <span>State:</span> {item.address.state}</p>
                <p> <span>Zip:</span> {item.address.zip}</p>
            </div>
        )
    })
    
    return (
        <div className="people-info-little__wrapper">
            {resultPeople.length ? <h4>Current people is</h4> : ''}           
            {resultPeople.length ? resultPeople : ''}
        </div>
    )
}

export default PeopleInfoLittle
