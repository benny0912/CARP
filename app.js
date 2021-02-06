const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Routes
const caseRoutes = require('./api/routes/cases');
const userRoutes = require('./api/routes/users');

// console.log(process.env.PORT)
// console.log(process.env.NODE_ENV)
// console.log(process.env.MONGO_ATLAS_PW)
// console.log(process.env.MONGO_ATLAS_DB)
// console.log(process.env.JWT_KEY)

// Database connection
mongoose.connect("mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW + "@carp.8rv8c.mongodb.net/" + process.env.MONGO_ATLAS_DB + "?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true}
)
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/carp/api/cases', caseRoutes);
app.use('/carp/api/users', userRoutes);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;