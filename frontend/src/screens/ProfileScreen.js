import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
// for flex-box building 
import { Form, Button, Row, Col, Toast, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'
// actions
import { getUserDetails } from '../actions/userAction'
import { updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderActions'
import {ORDER_LIST_RESET} from '../constants/orderConst'
import {ORDER_DETAILS_RESET} from '../constants/orderConst'


function validateEmail(email) { // функция для валидации почты
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ProfileScreen = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [validate, setValidate] = useState('')

    const dispatch = useDispatch()

    const orderList = useSelector( state => state.orderList )
    const { loading:loadingOrders, error:errorOrders, orders } = orderList

    const userDet = useSelector( state => state.userDetails )
    const { loading, error, user } = userDet

    const userLogin = useSelector( state=>state.userLogin )
    const { userInfo } = userLogin

    const userUpdateProf= useSelector( state=>state.userUpdate )
    const { success } = userUpdateProf

    useEffect( () => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if ( typeof(user) === 'undefined' || !user.name  ) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
                setValidate(true)
            }
        }
    }, [dispatch ,history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (validateEmail(email)) {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        } else {
            setMessage('Enter correct email')
        }  
    }

    const emailHandler = (emailValue) => {
        console.log(validateEmail(emailValue))
        setEmail(emailValue)
        if (!validateEmail(emailValue)) {
            setMessage('Enter correct email')
            setValidate(false)
        } else {
            setMessage('')
            setValidate(true)
            
        }
        
    }

    return (
        
         <Row>
             
            <Helmet>
                <title> Profile | Shoppy </title>
                <meta name="description" content="User profile"/>
                <meta name="keywords" content="electronics, buy electronics"/>
            </Helmet>

             <Col md={3} className={'py-3'}>
                    <h2> User Profile </h2>
                    {
                        message && <Message variant="danger">{message}</Message>
                    }
                    {
                        error && <Message variant="danger">{error}</Message>
                    }
                    {
                        success && <Message variant="success">Profile Updated</Message>
                    }
                    {
                        loading && <Loader />
                    }
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label> New Name </Form.Label>
                            <Form.Control 
                                type="name" 
                                placeholder="Enter name" 
                                value={name}
                                onChange={(e)=>{setName(e.target.value)}}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label> New Email Address </Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={(e)=>{emailHandler(e.target.value)}}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label> New password </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label> Confirm Password </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm password" 
                                value={confirmPassword}
                                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                            >
                            </Form.Control>
                        </Form.Group>
                        {
                        (password !== confirmPassword) ? (
                            <div className="center my-3">
                                <Toast style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    color: 'red'
                                    }}>
                                    <Toast.Body>Passwods are not equal</Toast.Body>
                                </Toast>
                            </div>
                        ) : null 
                        }
                        <Button disabled={!(confirmPassword === password) || !validate} className="my-2" type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                
             </Col>
             <Col md={9} className={'py-3'}>
                <h2 style={{paddingLeft:"50px"}}> My Orders </h2>
                    {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{error.orders}</Message> :
                    (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map( order => (
                                    <tr key={order._id}>
                                        <td>
                                            {order._id}
                                        </td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>
                                            ${order.totalPrice}
                                        </td>
                                        <td>
                                            {order.isPaid ? order.paidAt.substring(0, 10) :
                                                <i className="fa fa-times" style={{color: 'red'}}>

                                                </i>                                            
                                            }
                                        </td>
                                        <td>
                                            {order.isDelivered ? order.deliveredAt.substring(0, 10) :
                                                <i className="fa fa-times" style={{color: 'red'}}>

                                                </i>                                            
                                            }
                                        </td>
                                        <td>
                                           <LinkContainer to={`/orders/${order._id}`}>
                                               <Button variant="light" onClick={dispatch({type: ORDER_DETAILS_RESET})}>
                                                   Details
                                               </Button>
                                           </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                    }
            </Col>
         </Row>
    )
}

export default ProfileScreen
