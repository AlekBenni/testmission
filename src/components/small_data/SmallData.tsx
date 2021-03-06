import React, {useEffect, useRef, useState, useCallback} from 'react'
import { SmallDataType } from '../../redux/smallDataReducer'
import arrow from '../../assets/images/aa.png'
import PeopleInfoLittle from '../PeopleInfoLittle'
import Pagination from '../Pagination'
import Search from '../Search'
import ModalData from '../ModalData'
import {useDispatch} from 'react-redux'
import { setPeopleTC } from '../../api/smallDataActions'
import { changeActivePageAC } from '../../redux/serviceReducer'

type PropsType = {
    data: Array<SmallDataType>
}

function SmallData(props:PropsType) {
    const [result, setResult] = useState(props.data)
    const [flag, setFlag] = useState(true)
    const [arrowStyle, setArrowStyle] = useState('')
    const [peopleMail, setPeopleMail] = useState('')
    const sortable = useRef()
    const dispatch = useDispatch()

    const sortDataUp = useCallback(() => {
        setArrowStyle('downSort')
        let sortArray = result.sort((a, b) => a.id < b.id ? -1 : 1)
        setResult([...sortArray])
        setFlag(false)
    },[result])

    const sortDataDown = useCallback(() => {
        setArrowStyle('')
        let sortArray = result.sort((a, b) => a.id > b.id ? -1 : 1)
        setResult([...sortArray])
        setFlag(true)
    },[result])

    const [filter, setFilter] = useState('')

    const searchData = (value:string) => {
        setFilter(value)
        setCurrentPage(1)
    }

    const setPeople = (email:string) => {
        setPeopleMail(email)
        dispatch(changeActivePageAC(0))
    }

    const resultData = result.filter((item:SmallDataType) => 
    {if(filter === ''){return result} else if(item.firstName === filter){return item.firstName === filter }
    else if(item.lastName === filter){return item.lastName === filter }
    else if(item.email === filter){return item.email === filter }
    else if(item.phone === filter){return item.phone === filter }
    })
        .map((item:SmallDataType, index:number) => {
                return (
                <tr key={index} onClick={(e:any) => setPeople(`${item.email}`)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            )
    })
    
    useEffect(() => {
        document.body.addEventListener('click', clickOnElement);
        return () => {
            document.body.removeEventListener('click', clickOnElement)
        }
    }, [flag])

    const clickOnElement = (event:any) => {
        if(event.path.includes(sortable.current)) {
            if(flag) {
                sortDataUp()
            }else{
                sortDataDown()
            }    
        }
    }

    let postPerPage = 10
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

    const sendSmallData = (id:number, firstName:string, lastName:string, email:string, phone:string, address:{ streetAddress: string, city: string, state: string, zip: string}, description:string) => {
        dispatch(setPeopleTC(id, firstName, lastName, email, phone, address, description ))
    }

    return (
        <div>
            {modalOpen && <ModalData 
            closeModal={closeModal}
            sendData={sendSmallData}
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
                    ref={sortable}
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

export default React.memo(SmallData)
