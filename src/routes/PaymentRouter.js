const express = require("express");
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config()
const paymentController = require('../controllers/PaymentController');



router.get('/config', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    data: process.env.CLIENT_ID
  })
})


router.post('/create_payment_url',paymentController.createPaymentUrl)

module.exports = router