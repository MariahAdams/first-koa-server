require('dotenv').config();
const { createServer } = require('http');
const app = require('./lib/app');
const connect = require('./lib/utils/connect');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

connect(MONGODB_URI);

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server jammin on ${PORT}`);
});