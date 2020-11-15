import React, {useState} from 'react'
import {saveShippingAddress} from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'
// for flex-box building 
import { Form, Button } from 'react-bootstrap'
// product cart component
import FormContainer from '../components/FormContainer'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
 
const ShippingScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cartList)
    const { shippingAddress } = cart
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')//к текущему url прибавляю какой-либо путь
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1> Shipping </h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label> Address </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter address" 
                            value={address}
                            required
                            onChange={(e)=>{setAddress(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label> City </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter city" 
                            value={city}
                            onChange={(e)=>{setCity(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postalCode">
                        <Form.Label> Country </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter postal code" 
                            value={postalCode}
                            onChange={(e)=>{setPostalCode(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label> Postal Code </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Country" 
                            value={country}
                            onChange={(e)=>{setCountry(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button className="my-2" type="submit" variant="primary">
                        Send
                    </Button>
                </Form>
        </FormContainer>
    )
}

export default ShippingScreen
