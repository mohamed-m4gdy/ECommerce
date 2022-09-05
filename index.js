require('dotenv').config()
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require('morgan')
require("./utils/db.config");
const MongoStore = require("connect-mongo");
const conc = require("./utils/db.config");
const passport = require('passport')
const passportt = require('passport-local')
require('./utils/authStrategies/localStrategy')
const authMiddleware = require('./middlewares/authMiddleware')
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();
const config = require('./utils/config')

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug')

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: "788a154e2a8d87c4cafdee4a7d6dff2d90ab2586",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl: conc })
  })
);

app.use(express.static('public'))

app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
/**
 * Global MiddleWare To Make Logged In User Available to the views
 */
app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null
  return next()
})
/**
 * App Level Locals
 */
app.locals.title = 'Test Store'
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use("/", authRoutes);
app.use('/', categoryRoutes)

app.get("/", (req, res) => {
  res.render("pages/homepage");
});

app.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard/dashboard')
})

app.use( (req, res, next) => {
  res.status(404).render("pages/404")
});

app.listen(config.port, (req, res) => {
  console.log(`Server Now Is Running on ${config.port}`);
});

module.exports = app;
