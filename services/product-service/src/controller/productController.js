const productModel = require("../model/productModel");
const connectRabbitMQ = require("../config/connect_rabbitMQ");
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const addProduct = async(req, res, next) => {
    try {
        console.log(req.body);
        let { name, price, uid, pid } = req.body;
        if (name && price && uid) {
            const product = await productModel({
                name: name,
                price: price,
                uid: uid, 
                pid: pid
            }).save();
            
            if(product){
                res.json({product: product})
            }else{
                res.json({message: "failed to add product"})
            }
        }else{
            res.json({message: "Data insufficient.."})
        }
    } catch (error) {
        next(error)
    }
}



//service connection route ...
const buyProduct = async(req, res, next)=>{
    try {
        const { pid, uid } = req.body;
        const productData = await productModel.findById(pid);
        const channel = connectRabbitMQ('Product');
        channel.then((channel) => {
            console.log("message send to Order queue...");
            channel.sendToQueue("Order", Buffer.from(JSON.stringify({ data: productData, uid: uid })))
        })
        res.status(200).json({ success: true, message: "Product data sent to Order queue successfully." });
    } catch (error) {
        next(error);
    }
}

const addToCart = async (req, res, next) => {
    try {
        const { uid, pid } = req.body;
        const productData = await productModel.findById(pid);
        const producer = kafka.producer();

        await producer.connect();
        console.log("Product service connected to Kafka...");

        const message = JSON.stringify({ productData, uid }); 

        const sendMsg = await producer.send({
            topic: 'test_topic',
            messages: [
                { value: Buffer.from(message) },
            ],
        });

        if (sendMsg) {
            console.log("Message sent from product service to Kafka.");
            res.status(200).json({ success: true, message: "Message sent to Kafka successfully." });
        } else {
            throw new Error("Failed to send message to Kafka.");
        }
    } catch (error) {
        next(error);
    }
}


const listProducts = async (req, res, next) =>{
    try {
        const products = await productModel.find();
        res.json({products: products});
    } catch (error) {
        next(error);
    }
}
module.exports = {
    addProduct,
    buyProduct,
    listProducts,
    addToCart
}