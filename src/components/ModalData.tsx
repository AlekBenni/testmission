import React, {useRef, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { ChangeEvent } from 'react'
import close from '../assets/images/close.png'
import { setPeopleTC } from '../api/smallDataActions'
import { RootStateType } from '../redux/store'

type PropsType = {
    closeModal: Function
    sendData: Function
}

function ModalData(props:PropsType) {
    const loader = useSelector((state:RootStateType) => state.service.loader)
    const modal = useRef()

    useEffect(() => {
        document.body.addEventListener('click', clickOutOfModal)
        return () => {
            document.body.removeEventListener('click', clickOutOfModal)
        }       
    })

    const clickOutOfModal = (event:any) => {
        if(!event.path.includes(modal.current)){
            props.closeModal()
        }
    }

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [id, setId] = useState(Math.floor(Math.random() * (1000 - 1)) + 1)

    const [errorFirstName, setErrorFirstName] = useState('')
    const [errorLastName, setErrorLastName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPhone, setErrorPhone] = useState('')

    const [button, setButton] = useState(false)

    useEffect(() => {
        if((firstName.length !==0) && (lastName.length !==0) 
        && (email.length !==0) && (phone.length !==0) && (errorPhone.length < 1) 
        && (errorEmail.length < 1)){           
            setButton(true)
        }else{
            setButton(false)
        }
    }, [firstName, lastName, email ,phone, errorPhone, errorEmail])
    
    const changeFirstName = (value:any) => {
        if(value.search(/\d/) != -1 ){
            setErrorFirstName('error')
        }else{
            setFirstName(value)
            setErrorFirstName('')
        }      
    }

    const changeLastName = (value:any) => {
        if(value.search(/\d/) != -1 ){
            setErrorLastName('error')
        }else{
            setLastName(value)
            setErrorLastName('')
        }      
    }

    const changeEmail = (value:string) => {
        setEmail(value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(value).toLowerCase())){
            setErrorEmail('error')            
        }else{
            setErrorEmail('') 
        }
    }

    const changePhone = (value:string) => {
        setPhone(value)
        if(value.length < 8){
            setErrorPhone('error')
        }else{
            setErrorPhone('')
        }
    }

    const changeDescription = (value:string) => {
        setDescription(value)
    }

    const changeStreet = (value:string) => {
        setStreet(value)
    }

    const changeCity = (value:string) => {
        setCity(value)
    }

    const changeState = (value:string) => {
        setState(value)
    }

    const changeZip = (value:string) => {
        setZip(value)
    }

    const address = {streetAddress: street, city: city, state: state, zip: zip}

    const sendData = () => {
        props.sendData(id, firstName, lastName, email, phone, address, description)
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setDescription('')
        setStreet('')
        setCity('')
        setState('')
        setZip('')
    }

    return (
        <div className="modal-wrapper">
            <div
            //@ts-ignore
            ref={modal} className="modal">              
                <div className="header-modal">
                    <h2>Enter new people</h2>
                    <img onClick={() => props.closeModal()} src={close} alt="" />
                </div>   
                {loader && <div className="modal-loader"></div> }
                                
                    <div className="header-content">
                        <div className="header-content__left">
                            <span>First name</span>
                            <input type="text"
                            name="first name" autoComplete="disabled"
                            value={firstName} onChange={(e:ChangeEvent<HTMLInputElement>) => changeFirstName(e.currentTarget.value)}
                            />
                            <div className={`error-validation ${errorFirstName}`}>First name cant contain the numbers!</div>                           
                            <span>Last name</span>
                            <input type="text"
                            name="last name" autoComplete="disabled"
                            value={lastName} onChange={(e:ChangeEvent<HTMLInputElement>) => changeLastName(e.currentTarget.value)}
                            />
                            <div className={`error-validation ${errorLastName}`}>Last name cant contain the numbers!</div>
                        </div>
                        <div className="header-content__right">
                            <span>Email</span>
                            <input type="text" 
                            name="email" autoComplete="disabled"  
                            value={email} onChange={(e:ChangeEvent<HTMLInputElement>) => changeEmail(e.currentTarget.value)}
                            />
                            <div className={`error-validation ${errorEmail}`}>Email must contain special symbols!</div>

                            <span>Phone</span>
                            <input type="text"
                            name="phone" autoComplete="disabled"
                            value={phone} onChange={(e:ChangeEvent<HTMLInputElement>) => changePhone(e.currentTarget.value)}
                            />
                            <div className={`error-validation ${errorPhone}`}>Phone cant be less 8 symbols!</div>
                        </div>
                    </div>   
                    <div className="header-content__description">
                        <span>Description</span>
                        <textarea name="description"
                        value={description} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => changeDescription(e.currentTarget.value)}
                        ></textarea>
                    </div>
                    <div className="header-content">
                        <div className="header-content__left">
                            <span>Street</span>
                            <input type="text"
                            name="Street" autoComplete="disabled"
                            value={street} onChange={(e:ChangeEvent<HTMLInputElement>) => changeStreet(e.currentTarget.value)}
                            />                            
                            <span>City</span>
                            <input type="text"
                            name="City" autoComplete="disabled"
                            value={city} onChange={(e:ChangeEvent<HTMLInputElement>) => changeCity(e.currentTarget.value)}
                            />
                            <div className="error-validation">Name cant contain the numbers!</div>
                        </div>
                        <div className="header-content__right">
                            <span>State</span>
                            <input type="text" 
                            name="state" autoComplete="disabled"  
                            value={state} onChange={(e:ChangeEvent<HTMLInputElement>) => changeState(e.currentTarget.value)}
                            />
                            <span>Zip</span>
                            <input type="text"
                            name="zip" autoComplete="disabled"
                            value={zip} onChange={(e:ChangeEvent<HTMLInputElement>) => changeZip(e.currentTarget.value)}
                            />
                        </div>
                    </div>   
                <div className="header-content__btn">     
                { button ?  <button onClick={sendData}>Send data</button> : '' }              
                </div> 
            </div>           
        </div>
    )
}

export default ModalData
