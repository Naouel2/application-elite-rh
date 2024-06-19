const express = require('express');
const app = express();
const db = require('./config/database');  
const sequelize = require('./config/index').sequelize;  // contient la définition des relations de la BDD
const checkAuth = require('./middleware/checkAuth');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles');
const formationRoutes = require('./routes/formation');
const formateurRoutes = require('./routes/formateurs');
const reservationRoutes = require('./routes/reservations');
const salleRoutes = require('./routes/salles');
const passport = require('passport');
const strategy = require('./config/jwtOptions');
const bodyParser = require('body-parser');

// configuration of the rest API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use the strategy (token restrictions)
passport.use("strategy" , strategy);

// Auth routes
app.use('/auth', authRoutes);

// User routes
app.use('/users', checkAuth, userRoutes);

// Formation routes
app.use('/formations', checkAuth, formationRoutes);

// Formateurs routes
app.use('/formateurs', checkAuth, formateurRoutes);

// Reservations routes
app.use('/reservations', checkAuth, reservationRoutes);

// Roles routes
app.use('/roles', checkAuth, roleRoutes);

// Salles routes
app.use('/salles', checkAuth, salleRoutes);


module.exports = app;
