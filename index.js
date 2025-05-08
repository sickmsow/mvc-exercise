const express = require('express');
const path = require('path');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const userModel = require('./model/user');

userModel.setup?.();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', loginRouter);        
app.post('/register', registerRouter);   


app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome' });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
