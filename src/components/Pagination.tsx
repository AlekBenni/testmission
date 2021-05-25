import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { changeActivePageAC } from '../redux/serviceReducer'
import { RootStateType } from '../redux/store'

type PropsType = {
    postPerPage: number
    total: number
    paginate: (pageNumber:number) => void
}

function Pagination(props: PropsType) {
    const dispatch = useDispatch()
    const activePage = useSelector((state:RootStateType) => state.service.activePage)

    const {postPerPage, total, paginate} = props

    let pageNumber = []

    for (let i =1; i <= Math.ceil(total / postPerPage); i++){
        pageNumber.push(i)
    }

    const btnHandler = (page:number, index:number) => {
        paginate(page)
        dispatch(changeActivePageAC(index))
    }

    return (
        <div className="pagination">
            <span className="pagination__title">Page number:</span> 
            {pageNumber.map((page:number, index:number) => {
                return(
                    <button key={index} className={activePage === index ? "paginate__btnActive" : "paginate__btn"} onClick={() => btnHandler(page, index)}>{page}</button>
                )
            })}
        </div>
    )
}

export default Pagination

