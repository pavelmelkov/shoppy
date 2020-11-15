const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel') 

// @desc    Create new order
// @route   POST /api/order
// @access  Private
const addOrderItems = asyncHandler(
    async (req, res) => {
        const { 
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
         } = req.body

         if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error('Have no items')
            return
         } else {
             const order = new Order({
                user: req.user._id,
                orderItems, 
                shippingAddress, 
                paymentMethod, 
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
             })
             const createdOrder = await order.save()
             res.status(201).json(createdOrder)
         }


        }
)

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(
    async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate('user', 'name email')
            res.status(201)
            res.json(order)
        } catch (error) {
            res.status(500)
            throw new Error("Can't find this order")
        }
    }
)

// @desc    Update order by id
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderTpPaid = asyncHandler(
    async (req, res) => {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }

            const updatedOrder = await order.save()
            res.json(updatedOrder)
        } else {
            res.status(404)
            throw new Error('Order not found')
        }
    }
)

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(
    async (req, res) => {
        try {
            const orders = await Order.find({ user: req.user._id})
            res.json(orders)
        } catch (error) {
            res.status(404)
            throw new Error('Orders not found')
        }
    }
)

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(
    async (req, res) => {
        try {
            const orders = await Order.find({}).populate('user', 'id name')
            res.json(orders)
        } catch (error) {
            res.status(404)
            throw new Error('Orders not found')
        }
    }
)

// @desc    Update order by Admin
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderByAdmin = asyncHandler(
    async (req, res) => {
        try {

            const order = await Order.findById(req.params.id)

            if (order) {
                order.isDelivered = true
                order.deliveredAt = Date.now()
                const updatedOrder = await order.save()
                res.json(updatedOrder)
            } else {
                res.status(404)
                throw new Error('Order is not found')
            }
         
        } catch (error) {
            res.status(404)
            throw new Error(`Error ${error}`)
        }
    }
)

// @desc    Delete order by Admin
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrderByAdmin = asyncHandler(
    async (req, res) => {
    const deletedOrder = await Order.findById(req.params.id)

    if (deletedOrder) {
        await deletedOrder.remove()
        res.json({message: 'Order removed'})
    }else {
        res.status(404)
        throw new Error('Order not found')
     }
    }
)

module.exports = { 
    addOrderItems, 
    getOrderById, 
    updateOrderTpPaid, 
    getMyOrders, 
    getOrders, 
    updateOrderByAdmin,
    deleteOrderByAdmin,
}