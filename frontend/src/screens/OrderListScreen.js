import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
// for flex-box building 
import { Table, Button, Row, Col } from 'react-bootstrap'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'
// action functions
import { listOrders } from '../actions/orderActions'
import { deleteOrderByAdmin } from '../actions/orderActions'
// import { createOrderByAdmin } from '../actions/productAction'
// import { ORDER_CREATE_ADMIN_RESET } from '../constants/productConst'

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderAllList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDelete = useSelector(state => state.orderDelete)
    const { loading:loadingError, error:deleteError, success:deleteSuccess } = orderDelete

    // const deleteOrderStore = useSelector(state => state.deleteProduct)
    // const { 
    //     loading:deleteLoading, 
    //     success:deleteSuccess, 
    //     error:deleteError 
    // } = deleteOrderStore

    // const createOrderStore = useSelector(state => state.productCreate)
    // const { 
    //     loading:createLoading, 
    //     success:createSuccess, 
    //     error:createError, 
    //     product:createdProduct 
    // } = createProductStore
    
    useEffect( () => {

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }
        dispatch(listOrders())

    }, [dispatch, history, userInfo, deleteSuccess])
    
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteOrderByAdmin(id))
        }
    }

    return (
        <>
            <Row>
                <Col className="align-items-center">
                    <h1> Products </h1>
                </Col>
            </Row>
            {/* { createLoading ? <Loader/> : createError ? <Message variant="danger"> {createError} </Message> : null }
            { deleteLoading ? <Loader/> : deleteError ? <Message variant="danger"> {deleteError} </Message> : null} */}
            {
                loading ? <Loader/> : error ? <Message variant="danger"> {error} </Message>
                
                : (orders.length !== 0) ? (
                    <Table striped bordered hover responsive >
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> USER NAME </th>
                                <th> IS PAID</th>
                                <th> IS DELIVERED </th>
                                <th> PAYMENT METHOD </th>
                                <th>  </th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map( (order) => (
                                    <tr key={order._id}>
                                        <td> {order.user._id} </td>
                                        <td> {order.user.name} </td>
                                        <td> {order.isPaid  
                                        ? <i className="fas fa-check" style={{color:'green'}}></i> 
                                        : <i className="fas fa-times" style={{color:'red'}}></i>} </td>
                                        <td> {order.isDelivered 
                                        ? <i className="fas fa-check" style={{color:'green'}}></i> 
                                        : <i className="fas fa-times" style={{color:'red'}}></i>} </td>
                                        <td> {order.paymentMethod} </td>

                                        <td>
                                            <LinkContainer to={`/admin/orders/${order._id}/edit`}>
                                                <Button variant="light" className="btn-sm">
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>
                                            <Button 
                                                variant="danger" 
                                                className="btn-sm" 
                                                onClick={() => deleteHandler(order._id)}>
                                                    <i className="fas fa-trash">
                                                    </i>
                                            </Button>    
                                        </td>
                                     </tr>
                                 ) )
                            }
                        </tbody>
                    </Table>
                ) : <h3 style={{textAlign:'center'}}> No orders</h3>
            }
           
        </>
    )
}

export default OrderListScreen