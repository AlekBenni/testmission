import React, {useState} from 'react'
import { ChangeEvent } from 'react'

type PropsType = {
    searchData: any
}

function Search(props:PropsType) {
    const [value, setValue] = useState('')

    const deleteSearch = () => {
        props.searchData('')
        setValue('')
    }

    return (
        <div className="search-wrapper">
            <input type="text"
            value={value} onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
            />
            <button
            onClick={() => props.searchData(value)}
            >Search</button>
            <button
            className="search-remove__btn" onClick={() => deleteSearch()}
            >Remove</button>
        </div>
    )
}

export default Search
