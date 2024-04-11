const amqp = require('amqplib');

const connectRabbitMQ = async (service) => {
    const connectStr = 'amqp://localhost:5672';
    let connection, channel;

    try {
        connection = await amqp.connect(connectStr);
        channel = await connection.createChannel();
        await channel.assertQueue(service, { durable: false });
        console.log("RabbitMQ connection successful:", connectStr);
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
        if (connection) {
            await connection.close();
        }
        return null;
    }
    return channel;
};

module.exports = connectRabbitMQ;
