const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let books = [
  {
    id: '1',
    name: 'Livro 1',
    author: 'Autor 1',
    genre: 'Gênero 1',
    quantity: 10,
    image: 'imagem1.jpg'
  },
  {
    id: '2',
    name: 'Livro 2',
    author: 'Autor 2',
    genre: 'Gênero 2',
    quantity: 5,
    image: 'imagem2.jpg'
  }
];

// Middleware para o body-parser
app.use(express.json());

// Listar todos os livros
app.get('/books', (req, res) => {
  res.json(books);
});

// Comprar um livro
app.post('/books/:id/comprar', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Livro não encontrado' });
  }

  if (book.quantity < quantity) {
    return res.status(400).json({ message: 'Quantidade solicitada excede o disponível' });
  }

  book.quantity -= quantity;
  res.json(book);
});

// Cadastrar um novo livro
app.post('/books', (req, res) => {
  const { name, author, genre, quantity, image } = req.body;

  const newBook = {
    id: String(books.length + 1),
    name,
    author,
    genre,
    quantity,
    image
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
