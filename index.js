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

//АВТОРЫ
app.get('/profile/:id', async (req, res) => {// Роут для ejs
  try {
    const users = await request('http://localhost:3000/users', { json: true })
    const user = users.find(user => user._id == req.params.id);
    res.render('indexuser', { email: user.email, id: user._id });
   
  } catch (error) {
    console.log(error);
    res.send('Что-то пошло не так')
  }
})


app.get('/profiles', async (req, res) => { // Роут для ejs
  try {
    const users = await request(
      'http://localhost:3000/users', { json: true })
    
res.render('indexUsers', { users });
  } catch (error) {
  console.log(error);
  res.send('Что-то пошло не так');
}
});

//КНИГИ

app.get('/book/:id', async (req, res) => {// Роут для ejs
  try {
    const books = await request('http://localhost:3000/books', { json: true })
    const book = books.find(book => book._id == req.params.id);
    // console.log(book)
    res.render('indexbook', { bookId: book._id, title: book.title, description: book.description, image: book.image, authorId: book.authorId });
   
  } catch (error) {
    console.log(error);
    res.send('Что-то пошло не так')
  }
})

app.get('/books', async (req, res) => { // Роут для ejs
  try {
    const books = await request(
      'http://localhost:3000/books', { json: true })
    console.log(books)
res.render('indexBooks', { books });
  } catch (error) {
  console.log(error);
  res.send('Что-то пошло не так');
}
});


app.listen(process.env.PORT, () => {
  console.log('Server APP has started!');
});

