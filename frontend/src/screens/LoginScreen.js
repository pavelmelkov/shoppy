import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom'
import {userLogin} from '../actions/userAction'
// for flex-box building 
import { Form, Button, Row, Col } from 'react-bootstrap'
// product cart component
import FormContainer from '../components/FormContainer'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginScreen = ({location, history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userState = useSelector( state => state.userLogin )
    const { loading, error, userInfo } = userState

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect( () => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(email, password))
    }

    return (
        <div>
            <Helmet>
                <title> Login/Logout </title>
                <meta name="description" content="Login in the system"/>
                <meta name="keywords" content="electronics, buy electronics"/>
            </Helmet>
            <FormContainer>
                <h1 className="py-4"> Sign In </h1>
                {
                    error && <Message variant="danger">{error}</Message>
                }
                {
                    loading && <Loader>  </Loader>
                }
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
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
                    <Button className="my-2" type="submit" variant="primary">
                        Sign In
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer?{'    '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> 
                            Register
                        </Link>
                    </Col>
                </Row>

            </FormContainer>
        </div>
    )
}

export default LoginScreen
