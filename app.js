const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();

// let tweetHistory = [];

app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    const {tweetHistory} = req.cookies;
    res.locals.username = tweetHistory;
    next();
  });

app.get('/', function(req, res){
  res.render('index');
});

app.get('/dashboard', function(req, res){
  let {tweetHistory} = (req.cookies.tweetHistory)? req.cookies : {tweetHistory: []};
  res.render('dashboard', {tweetHistory:{tweetHistory}});
});

app.post('/dashboard', function(req, res){
  const {userTweet} = req.body;
  // Initialize tweetHistory with existing cookie content or an empty array
  let {tweetHistory} = (req.cookies.tweetHistory)? req.cookies : {tweetHistory: []};
  tweetHistory.push(userTweet);
  res.cookie('tweetHistory', tweetHistory, {maxAge: 1000*60*60*24});
  res.render('dashboard', {tweetHistory:{tweetHistory}})
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
