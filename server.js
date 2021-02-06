const http = require('http');
const app = require('./app')
const dotenv = require('dotenv');
dotenv.config();
// process.env.PORT ||
const port =  3000;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});