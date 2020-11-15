import React, { useState, useEffect} from 'react'
import {Helmet} from "react-helmet";
import axios from 'axios'
import { Link } from 'react-router-dom'
// for flex-box building 
import {PayPalButton} from 'react-paypal-button-v2'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderById, orderPay, updateOrderByAdmin } from '../actions/orderActions'
import { ORDER_LIST_RESET, ORDER_PAY_RESET } from '../constants/orderConst'
import { ORDER_UPDATE_ADMIN_RESET } from '../constants/orderConst'
import {listMyOrders} from '../actions/orderActions'

const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id

    const [sdkReady, setSdk] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPays = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPays

    const userStore = useSelector(state => state.userLogin)
    const { userInfo } = userStore

    const orderUpdateStore = useSelector(state => state.orderUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = orderUpdateStore

    useEffect( () => {
      
        if (!userInfo) {
            history.push('/login')
        }
        
            const addPayPalScript = async () => {
                const { data:clientId } = await axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true
                script.onload = () => {
                    setSdk(true)
                }
                document.body.appendChild(script)
            }
            
        if (!order || successPay || successUpdate) {
            dispatch({type: ORDER_LIST_RESET})
            dispatch({ type: ORDER_PAY_RESET})
            dispatch({ type: ORDER_UPDATE_ADMIN_RESET})
            dispatch(listMyOrders())
            dispatch(getOrderById(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdk(true)
            }
        } 
        
    }, [dispatch,orderId, match.params.id, successPay, successUpdate, order, userInfo, history])

   const successPaymentHandler = (paymentResult) => {
       dispatch(orderPay(orderId, paymentResult))
   }

   const deliverHandler = (order) => {
       console.log('order ', order)
       dispatch(updateOrderByAdmin(order))
   }

    return loading ? <Loader/> : error ? <Message variant="danger"> {error} </Message>  : (
        <> 
                     
            <Helmet>
                <title> Order | Shoppy </title>
                <meta name="description" content="Order"/>
                <meta name="keywords" content="electronics, buy electronics"/>
            </Helmet>    
       <h1>
           Order {order._id}
       </h1>
       <Link to={`/admin/orderlist`} className="btn btn-light my-3">
              Go back
        </Link>
        <Row>
        <Col md={8}>
            <ListGroup variant="flush">
                 <ListGroup.Item>
                    <h2>
                        Shipping
                    </h2>
                    <p><strong> Name: </strong> {order.user.name}</p>
                    <p><strong> Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    <p>
                        <strong> Address: </strong>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city},
                        {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                    </p>
                   
                    {
                        order.isDelivered ? <Message variant="success"> Delivered on {order.deliveredAt} </Message> : 
                        <Message variant="danger"> It wasn't delivered </Message>
                    } 
                   
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>
                        Payment Method
                    </h2>
                    <p> <strong className="py-4"> Method: </strong>
                    { order.paymentMethod }</p>
                    
                    {
                        order.isPaid ? <Message variant="success"> Paid on {order.paidAt} </Message> : 
                        <Message variant="danger"> Not Paid </Message>
                    } 
                   
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    { 
                        order.orderItems.length === 0 ? 
                        <Message> Order is empty </Message>
                        :
                        (
                            <ListGroup variant="flush">
                                {
                                    order.orderItems.map( (item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image  
                                                         src={item.image} 
                                                         alt={item.name} 
                                                         fluid 
                                                         rounded
                                                         />
                                                 </Col>
                                                 <Col>
                                                     <Link to={`/product/${item.product}`}>
                                                         {item.name}
                                                    </Link>
                                                 </Col>
                                                 <Col md={4}>
                                                         {+item.qty} x ${+item.price} = {+item.qty * +item.price}
                                                 </Col>
                                                    
                                             </Row>
                                          </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                    }
                </ListGroup.Item> 

            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
               <ListGroup variant="flush">
                   <ListGroup.Item>
                       <h2> Order Summary </h2>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Row>
                           <Col>
                                Items
                           </Col>
                           <Col>
                           ${   
                               order.itemsPrice 
                            }
                           </Col>
                       </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Row>
                           <Col>
                                Shipping
                           </Col>
                           <Col>
                           ${   
                                order.shippingPrice
                            }
                           </Col>
                       </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Row>
                           <Col>
                                Tax Price
                           </Col>
                           <Col>
                           ${  
                                order.taxPrice
                            }
                           </Col>
                       </Row>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Row>
                           <Col>
                                Total
                           </Col>
                           <Col>
                           ${   
                                order.totalPrice
                            }
                           </Col>
                       </Row>
                   </ListGroup.Item>
                        <ListGroup.Item>
                            { loadingPay && <Loader /> }
                            {
                                (!sdkReady) ? (
                                    <p>Already paid</p>
                                ) : (
                                    <PayPalButton 
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )
                            }
                        </ListGroup.Item>
                        {loadingUpdate && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button 
                                    type="button" 
                                    className="btn btn-block" 
                                    onClick={() => deliverHandler(order)}
                                    >
                                        Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        ) }
               </ListGroup> 
            </Card>
        </Col>

    </Row>
    </>
    )
}

export default OrderScreen
