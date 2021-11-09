const express = require('express');
const user = require('./src/routes/user');
const date = require('./src/routes/date');
const app = express();
const port = 8888;

app.use(express.json());

app.use('/user', user);
app.use('/date', date);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
