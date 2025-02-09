const express = require('express');
const dbConnect = require('./dbConnect');
const app = express();
app.use(express.json());

const path = require('path')
const userRoute = require('./routes/userRoute');
const transactionRoute = require('./routes/transactionRoute');
app.use('/api/users', userRoute);
app.use('/api/transactions', transactionRoute);

const port = process.env.port || 5000;

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static('client1/build'));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client1/build/index.html'));
    })
}


app.listen(port, () => console.log(`NodeJS Server started on port ${port}!`));