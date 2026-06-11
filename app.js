require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'HomeAssist API Running'
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});