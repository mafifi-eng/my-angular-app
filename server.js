const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Enable JSON parsing

app.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required in the request body' });
    }

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const html = $.html();

    res.json({ html });
  } catch (error) {
    console.error('Error scraping web page:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
