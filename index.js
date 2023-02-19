const express = require('express'); // подключаем модуль express
const app = express() //вызываем express
const dotenv = require('dotenv').config(); // прячет данные
const bodyParser = require('body-parser'); // подключение body parser для передачи
const request = require('request-promise');

// Process.on - определение ошибок при выполении кода
process.on('uncaughtException', (error) => {
  console.log('uncaughtException', error);
});

// Body parser для передачи парметров через body
const urlencodedParser = bodyParser.urlencoded({ // для передачи параметров через body
  extended: false,
});

app.use(urlencodedParser);// подключение bodyParser сразу на все роуты
app.set('view engine', 'ejs'); // подключение модуля ejs в качестве движка для рендера


//Роуты
app.get('/profile/:id', async (req, res) => {// Роут для ejs
  try {
    const users = await request('http://localhost:3000/users', { json: true })
    const user = users.find(user => user.id == req.params.id);
    res.render('index', { email: user.email, id: user.id });
    res.send(users)

  } catch (error) {
    console.log('catch');
    res.send('Что-то пошло не так')
  }
})



app.get('/profiles', async (req, res) => { // Роут для ejs
  try {
    const users = await request(
      'http://localhost:3000/users', { json: true })
    
res.render('indexpage', { users });
  } catch (error) {
  console.log('catch');
  res.send('Что-то пошло не так');
}
});


app.listen(process.env.PORT, () => {
  console.log('Server APP has started!');
});

