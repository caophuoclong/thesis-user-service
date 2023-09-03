export const configuration = () => ({
    rabbitmq: process.env.RABBITMQ_SERVER || 'amqp://localhost:5672',
});
