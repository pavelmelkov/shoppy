const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel') 
const User = require('../models/userModel')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(
    async (req, res) => {
        const pageSize = 4
        const page = Number(req.query.pageNumber) || 1
    
        const keyword = req.query.keyword ? {
            name:{
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {}
    
    const brand = req.query.brand
    if (brand) {
        const products = await Product.find({ brand: brand})
        res.json({products})
    } else {    
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
        res.json({ products, page, pages: Math.ceil(count / pageSize) })
    }
   
    }
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(
    async (req, res) => {
    const product = await Product.findById(req.params.id)

    const usersReviewedThisProduct = []
    for(let i = 0; i <= product.review.length - 1; i++){
        usersReviewedThisProduct.push(product.review[i].user)
    }

    if (product) {
        res.json({product, usersReviewedThisProduct})
    } else {
        res.status(404)
        throw new Error('Product not found')
     }
    }
)

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(
    async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id)

    if (deletedProduct) {
        await deletedProduct.remove()
        res.json({message: 'Product removed'})
    }else {
        res.status(404)
        throw new Error('Product not found')
     }
    }
)

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(
    async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    }
)

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(
    async (req, res) => {

    const { 
        name, 
        price, 
        description, 
        image, 
        brand, 
        category, 
        countInStock, 
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
  
    }
)

// @desc    Create new review 
// @route   POST /api/products/:id/review
// @access  Private
const createProductReview = asyncHandler(
    async (req, res) => {
    
    const { 
        rating, comment
    } = req.body
    
    const user = await User.findById(req.user._id)
    const product = await Product.findById(req.params.id)

    if (comment) {
        if (product) {

            const alreadyReviewed = product.review.find(r => 
                r.user.toString() === req.user._id.toString())
            
            if (alreadyReviewed) {
                res.status(400)
                throw new Error('Product already reviewed')
            }
    
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
    
            product.review.push(review)
            product.numReviews = product.review.length
    
            product.rating = product.review.reduce((acc, item)=>
              item.rating + acc, 0  
            ) / product.review.length
            
            await product.save()

            user

            await user.save()
            res.status(201).json({message: 'Review added'})
        } else {
            res.status(404)
            throw new Error('Product not found!')
        }
    } else {
        if (product) {
            const alreadyReviewed = product.review.find(r => 
                r.user.toString() === req.user._id.toString())
            
            if (alreadyReviewed) {
                res.status(400)
                throw new Error('Product already reviewed')
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                user: req.user._id
            }

            product.review.push(review)
            product.numReviews = product.review.length

            product.rating = product.review.reduce((acc, item)=>
            item.rating + acc, 0  
            ) / product.review.length

            await product.save()
            res.status(201).json({message: 'Review added'})
        } else {
            res.status(404)
            throw new Error('Product not found!')
        }
    }
  }
)

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const addCommentToReview =  asyncHandler( 
    async (req, res) => {
        
        const { 
            comment
        } = req.body

        const product = await Product.findById(req.params.id)

        if (product) {

            const userReview = product.review.find(r => 
                r.user.toString() === req.user._id.toString())
        
            userReview.comment = comment

            await product.save()
            res.status(201).json({message: 'Review updated'})

        } else {
            res.status(404)
            throw new Error('Product not found!')
        }

    }
)

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(
    async (req, res) => {
        const products = await Product.find({}).sort( {rating: -1} ).limit(3)
        res.json(products)
    }
)

module.exports = { 
    getProducts, 
    getProductById, 
    createProduct, 
    deleteProduct, 
    updateProduct,
    createProductReview,
    getTopProducts,
    // getBrandProducts,
    addCommentToReview,
}
