import React, { useState, useEffect, useCallback } from 'react'
import { Helmet } from "react-helmet";
// fro button 'back'
import { Link } from 'react-router-dom'
// for flex-box cart details styles
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
// rating component
import Rating from '../components/Rating'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/detailsAction'
import { createReview } from '../actions/productAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConst'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = (props) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [reviewed, setReviewed] = useState(false)

    const dispatch = useDispatch()

    const details = useSelector(state => state.details)
    const { loading, error, product, users, success: successDetails } = details

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReview)
    const { success: successReview, error: errorReview } = productReviewCreate
    
    useEffect(() => {

        if (users && userInfo !== null) {
            const reviewed = users.find(user => user.toString() === userInfo._id.toString()) ? true : false
            setReviewed(reviewed)
        }

        if (successReview) {
            alert('Review submited')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(detailsProduct(props.match.params.id))
    }, [dispatch, props.match.params.id, successReview, successDetails, reviewed]) // можно указать, при изменении какого параметра будет вызываться useEffect. 

    const addToCart = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
    }

    const sumbmitHandler = (e) => {
        e.preventDefault()
        dispatch(createReview(props.match.params.id, {
            rating: rating,
            comment: comment,
        }))
    }

    return (
        <>

            <Helmet>
                <title> {`${product.name}`}| Shoppy </title>
                <meta name="description" content="Product List" />
                <meta name="keywords" content="electronics, buy electronics" />
            </Helmet>

            <Link className="btn btn-light my-3" to="/" onClick={() => setReviewed(false)}>
                Go back
            </Link>

            <Row>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    <Col md={6}>
                        <Image src={product.image} style={{ paddingLeft: '50%', transform: 'translateX(-25%)', height: 'auto', width: 'auto' }} alt={product.name} fluid />
                    </Col>
                }

                {loading ? <Loader size='min' /> : error ? <Message variant='danger'>{error}</Message> :
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2> {product.name} </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    reviewed={reviewed}
                                    touch={true}
                                    productId={product._id}
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                }

                {loading ? <Loader size='min' /> : error ? <Message variant='danger'>{error}</Message> :
                    <>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                     </Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                     </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Qty:
                                         </Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        className="mr-sm-2"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => {
                                                                return (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>


                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCart}
                                            className="btn-block"
                                            type="button"
                                            disabled={!product.countInStock > 0}

                                        >
                                            Add To Cart
                                </Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>

                    </>
                }
            </Row>
            {product.countInStock >= 0 && (
                <>
                    <Row>
                        <Col md={6}>
                            <h2 className="py-3">Reviews</h2>
                            {[...product.review].length === 0 && <Message>No Reviews</Message>}
                        </Col>
                    </Row>
                    <ListGroup variamt="flush">

                        {[...product.review].map((reviewItem) => (
                            <ListGroup.Item key={reviewItem._id}>
                                <strong> {reviewItem.name} </strong>
                                <Rating reviewed={true} touch={false} value={reviewItem.rating} text={(reviewItem.rating).toString()} />
                                <p> {reviewItem.createdAt.substring(0, 10)} </p>
                                <p> {reviewItem.comment} </p>
                            </ListGroup.Item>
                        ))}
                        <h2 className="py-4"> Write a customer review </h2>
                        {errorReview && (
                            <Message variant="flush">
                                {errorReview}
                            </Message>
                        )}
                        <ListGroup.Item>

                            {
                                userInfo ?
                                    (
                                        <Form onSubmit={sumbmitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>
                                                    Rating
                                        </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''> Select... </option>
                                                    <option value='1'> 1 - Poor </option>
                                                    <option value='2'> 2 - Fair </option>
                                                    <option value='3'> 3 - Good </option>
                                                    <option value='4'> 4 - Very Good </option>
                                                    <option value='5'> 5 - Excellent </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>
                                                    Comment
                                        </Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                            >
                                                Comment
                                    </Button>
                                        </Form>
                                    ) : null

                            }
                        </ListGroup.Item>
                    </ListGroup>

                </>

            )}

        </>
    )
}

export default ProductScreen
