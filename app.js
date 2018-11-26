const express = require('express');
const app = express();
const request = require('request');
const liquid = require('liquidjs');
const bodyParser = require('body-parser');
const port = 3000;
const engine = liquid();

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/results', (req, res) => {
  const { movieTitle } = req.query;
  const url = `http://omdbapi.com/?s=${movieTitle}&apikey=thewdb`;
  request(url, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      res.render('results', { data });
    }
  })
});

app.get('/movie/:id', (req, res) => {
  const { id } = req.params;
  const url = `http://omdbapi.com/?i=${id}&apikey=thewdb`;
  request(url, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      console.log(data);
      res.render('movie', { data });
    }
  });
});

app.listen(port, () => console.log(`Listening on ${port}!`));
