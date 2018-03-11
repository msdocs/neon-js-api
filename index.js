const neon = require('@cityofzion/neon-js');
const Neon = neon.default;
const node = require('./backend/blockchain')
const config = require('./backend/config')
const account = Neon.create.account(config.wif)
const express = require('express')
const app = express()


app.get('/', (req, res) => res.send('API Alpha 1'));

app.get('/invokeContract/:task/:input', function(request, result) {
    input = request.params.input.split(",");
    node.invokeContract(request.params.task, input, account, (res) => {
        if (res.result === true) {
            result.send('Transaction processed!');
        } else {
            result.send('Transaction Failed!');
        }
    })
});
app.get('/getStorage/:key', function(request, result) {
    key = request.params.key;
    node.getStorage(key).then((res) => {
        if (typeof res === "string") {
           result.send(res);
        } else{
        	result.send("Error",res.result);
        }
    })
});

app.listen(3000, () => console.log('API Server on Port 3000'));