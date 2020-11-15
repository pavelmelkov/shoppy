import React, { useEffect } from 'react'
import {Helmet} from "react-helmet";
// for flex-box building 
import { Row, Col } from 'react-bootstrap'
// product cart component
import Product from '../components/Product'
// redux elems
import { listProducts } from '../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword

    const brand = match.params.brand

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector( state => state.productList )
    const { loading, error, products, page, pages} = productList

    useEffect( () => {
        dispatch(listProducts(keyword, brand, pageNumber))
    }, [dispatch, keyword, pageNumber, brand])

    return (
        <> 
            <Helmet>
                <title>Welcome to Shoppy | Home</title>
                <meta name="description" content="Sell the best products"/>
                <meta name="keywords" content="electronics, buy electronics"/>
            </Helmet>
        {!keyword && <ProductCarousel />}
            <h1 className="my-4"> 
                Latest Products 
            </h1> 
    {
            loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
            <>
                <Row>
                    {
                        products.map( (product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                                <Product product={product} />
                            </Col>
                        ))
                    }
                </Row>
                <Paginate 
                    pages={pages} 
                    page={page} 
                    keyword={keyword ? keyword : ''} 
                />
            </>
            }
            
        </>
    )
}

export default HomeScreen
