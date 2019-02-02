require('dotenv').config();
const app = require('./lib/app');

const PORT = process.env.PORT;

if(!module.parent) app.listen(PORT, () => {
    console.log(`Server jammin on ${PORT}`);
});