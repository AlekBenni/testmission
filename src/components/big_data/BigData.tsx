import React, {useEffect, useState, useRef, useCallback} from 'react'
import { BigDataType } from '../../redux/bigDataReducer'
import ModalData from '../ModalData'
import Pagination from '../Pagination'
import PeopleInfoLittle from '../PeopleInfoLittle'
import Search from '../Search'
import arrow from '../../assets/images/aa.png'
import {useDispatch} from 'react-redux'
import {setPeopleBigTC} from '../../api/bigDataActions'

type PropsType = {
    data: Array<BigDataType>
}

function BigData(props:PropsType) {
    let result = props.data
    const [flag, setFlag] = useState(true)
    const [arrowStyle, setArrowStyle] = useState('')
    const [peopleMail, setPeopleMail] = useState('')
    const sortableBig = useRef()
    const dispatch = useDispatch()

    const sortDataUp = useCallback(() => {
        setArrowStyle('downSort')
        result.sort((a, b) => a.id < b.id ? -1 : 1)
        setFlag(false)
    },[result])

    const sortDataDown = useCallback(() => {
        setArrowStyle('')
        result.sort((a, b) => a.id > b.id ? -1 : 1)
        setFlag(true)
    },[result])

    const [filter, setFilter] = useState("")

    const searchData = (value:string) => {
        setFilter(value)
        setCurrentPage(1)
    }

    const resultData = result.filter((item:BigDataType) => 
    {if(filter === ''){return result} else if(item.firstName === filter){return item.firstName === filter }
    else if(item.lastName === filter){return item.lastName === filter }
    else if(item.email === filter){return item.email === filter }
    else if(item.phone === filter){return item.phone === filter }
    })
        .map((item:BigDataType, index:number) => {
                return (
                <tr key={index} onClick={(e:any) => setPeopleMail(`${item.email}`)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            )
    })
    
    useEffect(() => {
        document.body.addEventListener('click', clickElement);
        return () => {
            document.body.removeEventListener('click', clickElement)
        }
    }, [flag, result])

    const clickElement = (event:any) => {
        if(event.path.includes(sortableBig.current)) {
            if(flag) {
                sortDataUp()
            }else{
                sortDataDown()
            }    
        }
    }

    let postPerPage = 50
    let [currentPage, setCurrentPage] = useState(1)
    let lastIndex = currentPage * postPerPage
    let firstIndex = lastIndex - postPerPage
    let totalPost = resultData.slice(firstIndex, lastIndex)
    const paginate = (pageNumber:number) => {
        setCurrentPage(pageNumber)
    }

    const [modalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const sendBigData = (id:number, firstName:string, lastName:string, email:string, phone:string, address:{ streetAddress: string, city: string, state: string, zip: string}, description:string) => {
        dispatch(setPeopleBigTC(id, firstName, lastName, email, phone, address, description ))
    }
    
    return (
        <div>
            {modalOpen && <ModalData 
            closeModal={closeModal}
            sendData={sendBigData}
            />}
            
        <div className="wrap">
            
            <div className="search-modal__wrapper">
                <div className="search-block">
                    <Search searchData={searchData} />
                </div>
                <div className="modal-block">
                    <button className="modal-open" onClick={openModal}>Add people</button>
                </div>
            </div>
            
            <table className="table">
                <thead>
                <tr>
                    <th 
                    //@ts-ignore
                    ref={sortableBig}
                    className="sort-element"> <span>id</span>  <img src={arrow} className={`table-arrow ${arrowStyle}`} alt="" /> </th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>phone</th>
                </tr>
                </thead>
                <tbody>
                    {totalPost}
                </tbody>
            </table>
            <Pagination postPerPage={postPerPage} total={resultData.length} paginate={paginate} />
            <PeopleInfoLittle peopleMail={peopleMail} data={props.data} />
        </div>
        </div>
    )
}

export default React.memo(BigData)
