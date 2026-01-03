const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description,discount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên sản phẩm đã tồn tại'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                countInStock: Number(countInStock), 
                price, 
                rating, 
                description,
                discount: Number(discount),
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy thông tin sản phẩm'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy thông tin sản phẩm'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Xóa sản phẩm thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Xóa sản phẩm thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy thông tin sản phẩm'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllProduct = (limit, page, sort, filter, advancedFilter) => { 
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments() 
            
            let query = {}
            if (filter) {
                const label = filter[0]
                query[label] = { '$regex': filter[1], '$options': 'i' } 
            }

            const { minPrice, maxPrice, rating } = advancedFilter || {}
            
            // Lọc giá
            if (minPrice !== undefined && maxPrice !== undefined) {
                query.price = { ...query.price, $gte: Number(minPrice), $lte: Number(maxPrice) }
            }

            if (rating) {
                query.rating = { ...query.rating, $gte: Number(rating) }
            }

            let productQuery = Product.find(query) 

            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                productQuery = productQuery.sort(objectSort)
            } else {
                productQuery = productQuery.sort({ createdAt: -1, updatedAt: -1 })
            }

            if (limit) {
                productQuery = productQuery.limit(limit).skip(page * limit)
            }

            const allProduct = await productQuery
            
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / (limit || totalProduct || 1)) // Fix chia cho null
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
}