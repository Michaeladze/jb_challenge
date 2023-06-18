import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

app.get('/contents', async (req, res) => {
  const url = 'https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json';

  try {

    // const data = fs.readFileSync('data.json', 'utf-8');
    const response = await axios.get(url);
    res.send(response.data);
  } catch (e) {
    // TODO Handle error
    console.log(e);
  }

});


app.listen(3000, () => {
  console.log('Local dev server has been started');
});
