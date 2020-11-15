import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// for flex-box building 
import { Form, Button } from 'react-bootstrap'
// product cart component 
import FormContainer from '../components/FormContainer'
// redux elems
import { useDispatch, useSelector } from 'react-redux'
// UI components
import Loader from '../components/Loader'
import Message from '../components/Message'
// actions
import { detailsProduct } from '../actions/detailsAction'
import { updateProductByAdmin } from '../actions/productAction'
import { PRODUCT_UPDATE_ADMIN_RESET } from '../constants/productConst'

const UserEditScreen = ({match, history}) => {

    const productId = match.params.id
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const productDetails = useSelector( state => state.details )
    const { loading, error, product } = productDetails

    const productUpdate = useSelector( state => state.updateProduct )
    const { 
        loading:updateLoading, 
        error:updateError, 
        success:successUpdate 
    } = productUpdate

    useEffect( () => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_ADMIN_RESET })
            history.push(`/admin/productlist`)
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(detailsProduct(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
      
    }, [dispatch, history , productId, product, successUpdate] )

    const submitHandler = (e) => {
        e.preventDefault()
        const updateProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }
        dispatch(updateProductByAdmin(updateProduct))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        console.log('e.target.files ', e.target.files)
        console.log('file', file)
        console.log('formdata ', formData)
        try {
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config) //?? proxy ??
            console.log('posted data ', data)
            setImage(data)
            setUploading(false)
        } catch(error) {
            console.log(error)
            setUploading(false)
        }
    }

    return (
        <>
          <Link to={`/admin/productlist`} className="btn btn-light my-3">
              Go back
          </Link>
          <FormContainer>
              <h1> Edit Product </h1>
              {updateLoading && <Loader/>}
              {updateError && <Message variant="danger"> {updateError} </Message>}
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
                    <Form.Group controlId="price">
                        <Form.Label> Price </Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter price" 
                            value={price}
                            onChange={(e)=>{setPrice(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label> Image </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter image url" 
                            value={image}
                            onChange={(e)=>{setImage(e.target.value)}}
                        >
                        </Form.Control>
                        <Form.File id="image-file" label="Choose File" custom 
                            onChange={uploadFileHandler}
                        >
                        </Form.File>
                        { uploading && <Loader/> }
                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label> Brand </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter brand" 
                            value={brand}
                            onChange={(e)=>{setBrand(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label> Category </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter category" 
                            value={category}
                            onChange={(e)=>{setCategory(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label> CountInStock </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter a countInStock" 
                            value={countInStock}
                            onChange={(e)=>{setCountInStock(e.target.value)}}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label> Description </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter description" 
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                        >
                        </Form.Control>
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