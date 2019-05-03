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

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
app.use(express.static('public'));

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

