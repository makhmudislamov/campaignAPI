const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express()
const campaigns = require('./controllers/campaigns');
const drivers = require('./controllers/drivers');
const customers = require('./controllers/customers');
// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
var exphbs = require('express-handlebars');


// app.use(express.static('public'));
// <<<<<<<Adding ajax - SPD 1.4 refactor >>>>>>>>
app.use(bodyParser.urlencoded({ extended: true }));

// This tells your app to allow parsing of JSON, which we'll need when we use Axios later
app.use(bodyParser.json());

// This tells your `Express.js` app to serve all client-side assets in its `public` folder, so that is where we'll put our JavaScript scripts.
app.use(express.static('public'));
// <<<<<<<>>>>>>>>
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo/OP1-webpage', { useNewUrlParser: true });

const port = process.env.PORT || 3000;
app.listen(port);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// HOME
app.get('/', (req, res) => {
    res.render('home');
});

campaigns(app);
drivers(app);
customers(app);

module.exports = app;

