const orderModel = require("../model/orderModel");

const connectRabbitMQ = require("rabbitmq-service-connector/connect_rabbitMQ");

const channel = connectRabbitMQ('Order');


channel.then((channel) => {
    channel.consume("Order", (data) => {
        const orderData = JSON.parse(data.content.toString()); 
        const orderStatus = orderProductData(orderData.data, orderData.uid);
        if (orderStatus) {
            console.log("Message consumed:", orderData);
        }else{
            console.log("Error in message consumption...");
        }
        channel.ack(data);
    });
});

async function orderProductData(productData, uid) {
    let order;
    const orderByUser = await orderModel.findOne({userId: uid});
    if (orderByUser) {
        order = await orderModel.updateOne({userId: uid}, {$push: {productData: productData}});
        if(order.modifiedCount == 1){
            return true
        }
    }else{
        order = await orderModel({
            productData: productData,
            userId: uid
        }).save();
        if (order) {
            return true;
        }
    }
}

const orderProduct = async(req, res, next) => {
    try {
        const { pid, uid } = req.body;
        if (pid && uid) {
            const order = await orderModel({
                productId: pid,
                userId: uid
            }).save();
            if (order) {
                res.json({orderData: order});
            }else{
                res.json({message: "order failed"});
            }
        }else{
            res.json({message: "data missing"})
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { 
    orderProduct
}