const express = require('express')
const cookieSession=require('cookie-session');
const passport=require('passport');
require('./models/User');

const mongoose=require('mongoose');
const keys=require('./config/keys');
const { Passport } = require('passport');
require('./services/passport');

const app = express();
const port = 5000;

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
mongoose.connect(keys.mongoURI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('Hello MailEasy!')
})

require('./routes/authRoutes')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

