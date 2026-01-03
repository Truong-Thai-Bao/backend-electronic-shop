// src/controllers/PaymentController.js
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay');
const dotenv = require('dotenv');
dotenv.config();



const createPaymentUrl = async (req, res) => {
    try {
        const { amount, language } = req.body;
        
        const vnpay = new VNPay({
            tmnCode: process.env.TMN_CODE, 
            secureSecret: process.env.SECURE_SECRET_VNPAY,
            vnpayHost: 'https://sandbox.vnpayment.vn',
            testMode: true,
            hashAlgorithm: 'SHA512',
            enableLog: true,
            loggerFn: ignoreLogger,
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const urlString = await vnpay.buildPaymentUrl({
            vnp_Amount: amount,
            vnp_IpAddr: req.ip || '127.0.0.1',
            vnp_TxnRef: `ORDER_${new Date().getTime()}`, 
            vnp_OrderInfo: `Thanh toán đơn hàng ${new Date().getTime()}`,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: `${process.env.APP_API_URL}/orderSuccess`, 
            vnp_Locale: language === 'vn' ? VnpLocale.VN : VnpLocale.EN,
            vnp_CreateDate: dateFormat(new Date()),
            vnp_ExpireDate: dateFormat(tomorrow),
        });

        return res.status(200).json({
            status: 'OK',
            message: 'Success',
            data: urlString 
        });

    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: e.message });
    }
}

module.exports = {
    createPaymentUrl
}