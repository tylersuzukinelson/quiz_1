const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res){
  response.render('index');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
