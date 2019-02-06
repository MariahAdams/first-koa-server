require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server jammin on ${PORT}`);
});