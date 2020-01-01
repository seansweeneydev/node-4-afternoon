require('dotenv').config()
const express = require('express')
      session = require('express-session')
      checkForSession = require('./middlewares/checkForSession')
      swagController = require('./controllers/swagController')
      authController = require('./controllers/authController')
      cartController = require('./controllers/cartController')
      searchController = require('./controllers/searchController')
const {SERVER_PORT, SESSION_SECRET}=process.env
      
const app = express()

// * TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialize: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

// * ENDPOINTS
// * SWAG
app.get('/api/swag', swagController.read)
// * AUTH
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
// * CART
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)
// * SEARCH
app.get('/api/search', searchController.search);


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT}`)
})