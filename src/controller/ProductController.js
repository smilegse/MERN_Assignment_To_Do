const ProductModel = require("../model/ProductModel");

// Create a new product
const newProduct = {
    title: "New Product",
    short_des: "Description of the new product",
    price: 99.99,
    discount: 10,
    image: "product_image.jpg",
    stock: "In Stock",
    star: "4.5",
    remark: "This is a new product",
};

// Create a update product
const updateProduct = {
    title: "update Product 3",
    short_des: "Description of the new product ",
    price: 88.99,
    discount: 10,
    image: "product1_image.jpg",
    stock: "In Stock",
    star: "4.6",
    remark: "This is a update product",
    };



exports.createProduct = async (req, res)=>{
    try {
        let reqBody = req.body;
        await ProductModel.create(newProduct);
        res.json({status:"success", message: "Product Created"});

    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.selectProductById = async (req, res)=>{
    try {
        
        let { id } = req.params;
        let result = await ProductModel.find({_id: id});
        res.json({status:"success", data: result});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}

exports.deleteProductById = async (req, res)=>{
    try {
        let {id} = req.params;
        await ProductModel.deleteOne({_id:id});
        res.json({status:"success", message:"Product Delete Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }

}

exports.updateProductById = async (req, res)=>{
    try {
        let { id } = req.params;
        let reqBody = req.body;
        //await ProductModel.updateOne({_id:id},updateProduct);
        await ProductModel.updateOne({_id:id},reqBody);
        res.json({status:"success", message: "Product Update Completed"});
    } catch (error) {
        res.json({status:"fail", message:error})
    }
}




