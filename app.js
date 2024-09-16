const express = require('express');
const path = require('node:path');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'views');



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express App listening to port ${PORT}`);
});