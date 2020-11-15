const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const reviewSchema = Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true },
    comment: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const productSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    review: [ reviewSchema ],
    price: {
        type: String,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    
}, {
       timestamps: true
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product