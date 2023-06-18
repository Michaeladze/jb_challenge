const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/contents', async (req, res) => {
  const url = 'https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json';
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (e) {
    console.log(e);
  }
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(3000, () => {
  console.log('Local dev server has been started');
});
