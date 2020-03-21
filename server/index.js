const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//Middleware
app.use(morgan('tiny')); //Logs server requests like post, get...
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Fullstack message board'
  });
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
