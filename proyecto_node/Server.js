const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Datos de ejemplo (simulando una base de datos)
let users = [];

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Ruta para obtener un usuario por su ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Ruta para crear un usuario
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Ruta para actualizar un usuario
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Ruta para eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  users = users.filter(user => user.id !== userId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
