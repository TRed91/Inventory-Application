const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter.js');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter)

app.get('/*', (req, res) => {
    res.render('404');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express App listening to port ${PORT}`);
});