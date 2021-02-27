const {info} = require('./AppFunctions/info');
const {download} = require('./AppFunctions/download');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/download', download);

app.get('/info', info);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
