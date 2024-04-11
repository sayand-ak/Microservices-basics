const cartModel = require("../model/cartModel");
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const listCart = async(req, res, next) => {
    try {
        const { uid } = req.body;
        const cartData = await cartModel.findOne({ userId: uid });
        if(cartData){
            res.json({ cartData: cartData });
        }else{
            res.json({message: "empty cart"});
        }
    } catch (error) {
        next(error);
    }
}

const addToCart = async() => {
    try {
        const consumer = kafka.consumer({ groupId: 'test_group' });
        await consumer.connect();
        console.log("Consumer cart connected successfully...");
        await consumer.subscribe({ topic: 'test_topic', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    console.log({
                        partition,
                        offset: message.offset,
                        value: message.value.toString(),
                    });
                    
                    const data = JSON.parse(message.value.toString());
                    
                    const existingCart = await cartModel.findOne({ userId: data.uid });
                    if (existingCart) {
                        const updateCart = await cartModel.updateOne(
                            { userId: uid },
                            { $push: { productData: data.productData } }
                        );
                        if (updateCart.modifiedCount === 1) {
                            console.log("Product added to cart successfully..");
                        }
                    } else {
                        const newCart = await cartModel({
                            productData: data.productData,
                            userId: data.uid
                        }).save();
                        if (newCart) {
                            console.log("New item added to cart...");
                        }
                    }
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            },
        });
    } catch (error) {
        console.error("Error connecting to Kafka:", error);
    }
}
addToCart()

module.exports = {
    listCart,
}

