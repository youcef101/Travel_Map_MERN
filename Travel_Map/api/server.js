const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const markerRouter = require('./routes/markers')
const authRouter = require('./routes/auth')

//.env config
dotenv.config()

//app config
const app = express()
const port = process.env.PORT || 8001

//middlewares
app.use(express.json())
app.use(cors())

//db config
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(console.log('connected to mongoDB !!!'))
    .catch(err => console.log(err));
//API endpoints
app.get('/', (req, res) => {
    res.status(200).send('hello from travel map api !!!')
})

app.use('/api/auth', authRouter)
app.use('/api/marker', markerRouter)
//server listen
app.listen(port, () => {
    console.log(`server listen on localhost: ${port}`)
})