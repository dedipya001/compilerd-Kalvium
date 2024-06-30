require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const baseRouter = require('./router.js')
const morgan = require('morgan')
const PORT = process.env.PORT || 8000
const { respond, l } = require('./loader.js').helpers

require('./loader.js').loadDependency(app)

/* Middlewares */
app.use(express.json())

// Error handling middleware for parsing JSON errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return respond(res, 400, { message: 'Invalid JSON found' })
    }
    next()
})

// Logging middleware for API requests (excluding /api/)
app.use(
    morgan(
        'REQUEST [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
        {
            immediate: true,
            skip: function (req) { return (req.path === '/api/') },
        },
    ),
)

// Middleware for parsing urlencoded data
app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb',
        parameterLimit: 1000000,
    }),
)

// Compression middleware for compressing responses
app.use(compression())

// Helmet middleware for setting various HTTP headers for security
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: ["'self'", "http://localhost:8000", "http://localhost:3000"]
        }
    }
}))

// CORS middleware for enabling Cross-Origin Resource Sharing
app.use(cors())

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')))

// Mount the baseRouter under the '/api/' prefix
app.use('/api/', baseRouter)

// Serve index.html for the root URL ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    l.info(`Server started at port: ${PORT}`)
})
