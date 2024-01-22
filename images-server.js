const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const downloadFolder = path.join(__dirname, 'downloaded-images');

if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder);
}
function getImageNameFromUrl(url) {
    const parts = url.split('/');
    const imageNameWithExtension = parts[parts.length - 1].split('?')[0];
    return imageNameWithExtension;
}

app.get('/download-image', async (req, res) => {
  try {
    const { imageUrl } = req.query;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Missing imageUrl parameter' });
    }

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const extension = path.extname(imageUrl);
    const fileName = getImageNameFromUrl(imageUrl);
    const filePath = path.join(downloadFolder, fileName);

    fs.writeFileSync(filePath, imageResponse.data);

    res.status(200).json({ success: true, filePath: fileName });
  } catch (error) {
    console.error('Error downloading image:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
