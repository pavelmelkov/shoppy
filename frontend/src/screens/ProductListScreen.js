import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Helmet} from "react-helmet";
// for flex-box building 
import { Table, Button, Row, Col } from 'react-bootstrap'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'
// action functions
import { listProducts } from '../actions/productAction'
import { deleteProductByAdmin } from '../actions/productAction'
import { createProductByAdmin } from '../actions/productAction'
import { PRODUCT_CREATE_ADMIN_RESET } from '../constants/productConst'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDeleteStore = useSelector(state => state.deleteProduct)
    const {
        loading: deleteLoading,
        success: deleteSuccess,
        error: deleteError
    } = productDeleteStore

    const createProductStore = useSelector(state => state.productCreate)
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
        product: createdProduct
    } = createProductStore

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_ADMIN_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (createSuccess) {
            history.push(`/admin/products/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', '', pageNumber))
        }

    }, [dispatch, history, userInfo, deleteSuccess, createSuccess, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProductByAdmin(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProductByAdmin())
    }

    return (
        <>
      
          <Helmet>
                <title> Admin Product List | Shoppy </title>
                <meta name="description" content="Admin Product List"/>
                <meta name="keywords" content="electronics, buy electronics"/>
            </Helmet>
            <Row>
                <Col className="align-items-center">
                    <h1> Products </h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={() => createProductHandler()}>
                        Create
                        </Button>
                </Col>
            </Row>
            { createLoading ? <Loader /> : createError ? <Message variant="danger"> {createError} </Message> : null}
            { deleteLoading ? <Loader /> : deleteError ? <Message variant="danger"> {deleteError} </Message> : null}
            {
                loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message>

                    : (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th> ID </th>
                                        <th> NAME </th>
                                        <th> PRICE </th>
                                        <th> CATEGORY </th>
                                        <th> CATEGORY </th>
                                        <th> BRAND </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product) => (
                                            <tr key={product._id}>
                                                <td> {product._id} </td>
                                                <td> {product.name} </td>
                                                <td> ${product.price} </td>
                                                <td> {product.category}</td>
                                                <td> {product.brand} </td>
                                                <td>
                                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                                        <Button variant="light" className="btn-sm">
                                                            <i className="fas fa-edit">
                                                            </i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button
                                                        variant="danger"
                                                        className="btn-sm"
                                                        onClick={() => deleteHandler(product._id)}>
                                                        <i className="fas fa-trash">
                                                        </i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
                        </>
                    )
            }

        </>
    )
}

export default ProductListScreen