import React, {useState} from 'react'
import { ChangeEvent } from 'react'

type PropsType = {
    searchData: any
}

function Search(props:PropsType) {
    const [value, setValue] = useState('')

    return (
        <div className="search-wrapper">
            <input type="text"
            value={value} onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
            />
            <button
            onClick={() => props.searchData(value)}
            >Search</button>
        </div>
    )
}

export default Search
