import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Helmet} from "react-helmet";
// UI
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartAction'
import { removeFromCart } from '../actions/cartAction'
import { Link } from 'react-router-dom'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector( (state) => state.cartList)
    const { cartItems } = cart

    // const [sumCount, setCount] = useState(0)

    useEffect( () => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
                <Helmet>
                    <title> Your Cart | Shoppy </title>
                    <meta name="description" content="Cart of products"/>
                    <meta name="keywords" content="electronics, buy electronics"/>
                </Helmet>
            <Col md={8}>
                <h1> Shopping Cart </h1>
                {
                    cartItems.length === 0 ? 
                    <Message variant='danger'> Cart is empty <Link to='/'>Go back</Link></Message> : 
                    <ListGroup variant="flush"> 
                        {
                            cartItems.map( (item) => (
                            
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}> {item.name} </Link>
                                        </Col>
                                        <Col md={2}>
                                          ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control 
                                                as='select'
                                                className="mr-sm-2"
                                                value={qty} 
                                                onChange={(e)=> dispatch(addToCart(item.product,
                                                    Number(e.target.value)))} 
                                                >
                                                {
                                                     [...Array(item.countInStock).keys()].map( (x) => {
                                                      return (
                                                        <option key={x + 1} value={x + 1}> 
                                                            {x + 1}
                                                        </option>
                                                      ) 
                                                    })
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            {item.qty}
                                            <Button type="button" variant="light" onClick={() => {
                                                dispatch(removeFromCart(item.product))
                                            }}>
                                                <i className="fa fa-trash"/>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                
                            
                            ))
                        }
                    </ListGroup> 
                }
            </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2> Subtotal (
                                    {   
                                        cartItems.length !== 0 ?
                                            cartItems.reduce( (accumulator, currentValue) => {
                                                return accumulator + currentValue.qty
                                            }, 0) 
                                        : 
                                        '0'
                                    }
                                ) items </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2> $ 
                                    {   
                                        cartItems.length !== 0 ?
                                            cartItems.reduce( (accumulator, currentValue) => {
                                                return accumulator + +currentValue.price*currentValue.qty
                                            }, 0).toFixed(2)
                                        : 
                                        '0'
                                    }
                                 </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Button 
                                    type="button" 
                                    className='btn-block' 
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                               </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
        </Row>
    )
}

export default CartScreen
