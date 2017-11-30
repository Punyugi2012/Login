var express = require('express');
var bodyParser = require('body-parser');
var signinRouter = require('./routes/signin.js');
var signupRouter = require('./routes/signup.js');
var session = require('express-session');
var contentRouter = require('./routes/content.js');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "Your secret key", cookie: { maxAge: 100000 }, resave: true, saveUninitialized: true }));
app.use('/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist`));
app.use('/jquery', express.static(`${__dirname}/node_modules/jquery/dist`));
app.use('/popper.js', express.static(`${__dirname}/node_modules/popper.js/dist/umd`));

app.use((req, res, next) => {
    console.log(`Request ${req.url} ${req.method}`);
    next();
});
app.get('/', (req, res) => {
    res.redirect('/signin');
})
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/content', contentRouter);

app.all('*', (req, res) => {
    res.status(404);
    res.send('Not Found');
})

app.listen('4400', () => {
    console.log('Server Started listen 4400!!!');
})

