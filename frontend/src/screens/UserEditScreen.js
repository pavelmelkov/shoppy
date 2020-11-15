import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserDetails, updateUserByAdmin } from '../actions/userAction'
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConst'
// for flex-box building 
import { Form, Button } from 'react-bootstrap'
// product cart component
import FormContainer from '../components/FormContainer'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserEditScreen = ({match, history}) => {

    const userId = match.params.id

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector( state => state.userDetails )
    const { loading, error, user } = userDetails

    const userUpdate = useSelector( state => state.updateUserByAdmin )
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

    useEffect( () => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_ADMIN_RESET})
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history ,user, userId, successUpdate] )

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserByAdmin({_id: userId, name, email, isAdmin }))
    }

    return (
        <>
          <Link to={`/admin/userlist`} className="btn btn-light my-3">
              Go back
          </Link>
          <FormContainer>
              {
                  loadingUpdate ? <Loader/> : errorUpdate ? <Message variant="danger">{errorUpdate}</Message> : null
              }
            {   
                loading 
                ? 
                <Loader></Loader> 
                : 
                error 
                ? 
                <Message variant="danger"> {error} </Message> 
                :
               (
                <>
                <h1> Edit User </h1>
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
                            onChange={(e)=>{setEmail(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="isadmin">
                        <Form.Check 
                            type="checkbox" 
                            label ="Is Admin" 
                            checked={isAdmin}
                            onChange={(e)=>{setIsAdmin(e.target.checked)}}
                        >
                        </Form.Check>
                    </Form.Group>
                    <Button className="my-2" type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
                </>
               )
            }
            </FormContainer>  
        </>
    )
}

export default UserEditScreen
