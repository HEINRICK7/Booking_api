const express = require('express')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3333;

app.listen(port, (err)=> {
    if(err) {
        console.log(err)
    }else {
        console.log(`connected server http://localhost:${port}`)
    }
})