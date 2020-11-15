const express = require('express')
const router = express.Router()

const { getOrderById } = require('../controllers/orderController')
const { addOrderItems } = require('../controllers/orderController')
const { updateOrderTpPaid } = require('../controllers/orderController')
const { getMyOrders } = require('../controllers/orderController')
//admin controllers
const { getOrders } = require('../controllers/orderController')
const { updateOrderByAdmin } = require('../controllers/orderController')
const { deleteOrderByAdmin } = require('../controllers/orderController')

const {protect, admin} = require('../middleware/authMiddleware')

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id')
    .get(protect, getOrderById)
    .delete(protect, admin, deleteOrderByAdmin)
router.route('/:id/pay').put(protect, updateOrderTpPaid)
router.route('/:id/deliver')
    .put(protect, admin, updateOrderByAdmin)

module.exports = router