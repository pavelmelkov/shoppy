import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userRegister } from '../actions/userAction'
// for flex-box building 
import { Form, Button, Row, Col,Toast } from 'react-bootstrap'
// product cart component
import FormContainer from '../components/FormContainer'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'

function validateEmail(email) { // функция для валидации почты
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const RegisterScreen = ({location, history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [validate, setValidate] = useState('')

    const dispatch = useDispatch()

    const userReg = useSelector( state => state.userRegister )
    const { loading, error, userInfo } = userReg

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect( () => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (validateEmail(email)) {
            dispatch(userRegister(email, password, name))
            
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
        <div>
            <FormContainer>
                <h1 className="py-4"> Sign Up </h1>
                {
                    message && <Message variant="danger">{message}</Message>
                }
                {
                    error && <Message variant="danger">{error}</Message>
                }
                {
                    loading && <Loader>  </Loader>
                }
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label> Name </Form.Label>
                        <Form.Control 
                            type="name" 
                            placeholder="Enter name" 
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e)=>{emailHandler(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label> Password </Form.Label>
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
                        Sign Up
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Already sign up?{'    '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> 
                            Login
                        </Link>
                    </Col>
                </Row>

            </FormContainer>
        </div>
    )
}

export default RegisterScreen
