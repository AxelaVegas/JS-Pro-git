const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));

const cartDB = './server/db/userCart.json'
const prodDB = './server/db/products.json'

app.get('/api/products', (req, res) => {
    fs.readFile(prodDB, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});

app.get('/api/cart', (req, res) => {
    fs.readFile(cartDB, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});

app.post('/api/cartPost', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            })
        } else {
            const cart = JSON.parse(data)
            cart.contents.push(req.body)

            fs.writeFile(cartDB, JSON.stringify(cart), { encoding: "utf-8" }, (err) => {
                if(err){
                    res.send({
                        result: 0,
                        err,
                    })
                } else res.send({ result: 1 })
            })
        }
    })
});

app.put('/api/cartPut/:id', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            })
        }
        else {
            const cart = JSON.parse(data)
            const change = cart.contents.find((good) => {
                return good.id_product === +req.params.id
            })
            change.quantity += req.body.quantity

            fs.writeFile(cartDB, JSON.stringify(cart, null, 4), 'utf-8', (err, data) => {
                if(err){
                    res.send({
                        result: 0,
                        err,
                    })
                }
                else res.send({
                    result: 1,
                })
            })
        }

    })
})

app.delete('/api/delete/:id', (req, res) => {
    fs.readFile(cartDB, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            })
        }
        else {
            const cart = JSON.parse(data)
            const newContents = []
            cart.contents.forEach((good) => {
                if(good.id_product === +req.params.id) {
                    if (good.quantity !== 1) {
                        good.quantity -= 1
                        newContents.push(good)
                    }
                } else newContents.push(good)
            })
            cart.contents = newContents

            fs.writeFile(cartDB, JSON.stringify(cart), 'utf-8', (err, data) => {
                if(err){
                    res.send({
                        result: 0,
                        err,
                    })
                }
                else res.send({
                    result: 1,
                    cartItem: cart
                })
            })
        }

    })
})

app.listen(3000, () => console.log('Listen on port 3000...'));