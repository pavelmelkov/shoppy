import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = (props) => {
    return (
        <Card className="my-3 p-2 rounded">
            <Link to={`/product/${props.product._id}`}>
                <Card.Img 
                    style={{width:'100%', minHeight: "37vh", objectFit:'cover'}} 
                    src={props.product.image} variant="top" 
                />
            </Link>
            <Card.Body>
            <Link to={`/product/${props.product._id}`}>
                <Card.Title as="div"> 
                    <strong>{props.product.name}</strong> 
                </Card.Title>
            </Link>
                <Card.Text as="div">  
                    <Rating 
                        reviewed={true}
                        value={props.product.rating} 
                        text={`${props.product.numReviews} reviews`}
                        // color='red'
                    />
                </Card.Text>
                <Card.Text as="h3">  
                    ${props.product.price}
                </Card.Text>
           
            </Card.Body>
        </Card>
    )
}

export default Product
