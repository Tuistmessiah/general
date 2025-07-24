const express = require('express');
const mysql = require('mysql2/promise');
const axios = require('axios');
const app = express();
app.use(express.json());

// 1. PROMISE EXAMPLE: mysql2/promise uses Promises instead of callbacks
const pool = mysql.createPool({
  host: 'localhost',
  // port: 3307,
  user: 'root',
  password: 'YOUR_PASSWORD',
  database: 'pet_shop'
});

// ---- MIDDLEWARE ----
const logRequests = (req, res, next) => {
  // 2. CALLBACK EXAMPLE: next() is a callback function
  console.log(`🐾 Request to: ${req.path}`);
  next(); // Pass control to the next middleware
};
app.use(logRequests);

// ---- CRUD ENDPOINTS ----
// GET all cats with error handling
app.get('/cats', async (req, res) => {
  try {
    // 3. .THEN/.CATCH EXAMPLE: Alternative to async/await
    pool.query('SELECT * FROM cats')
      .then(([rows]) => res.json(rows))
      .catch(err => {
        throw err;
      });
  } catch (err) {
    next(err);
  }
});

// POST new cat with spread operator
app.post('/cats', async (req, res) => {
  const catData = req.body;
  
  // 4. SPREAD OPERATOR (OBJECT): Merge defaults with incoming data
  const newCat = {
    evilness: 5, // Default value
    ...catData    // Overrides defaults with user-provided data
  };

  await pool.query('INSERT INTO cats SET ?', [newCat]);
  res.status(201).send('Cat added!');
});

// GET random dog with array spread
app.get('/random-dogs/:count', async (req, res) => {
  const { count } = req.params;
  
  // 5. SPREAD OPERATOR (ARRAY): Fetch multiple dogs in parallel
  const dogPromises = [];
  for (let i = 0; i < Number(count); i++) {
    dogPromises.push(axios.get('https://dog.ceo/api/breeds/image/random'));
  }

  const dogs = await Promise.all(dogPromises);
  const dogImages = dogs.map(dog => dog.data.message);

  res.send(`
    <h1>${count} Random Dogs</h1>
    ${dogImages.map(img => `<img src="${img}" height="200">`).join('')}
  `);
});

// PUT update cat with Promise resolve/reject
app.put('/cats/:id', (req, res) => {
  const { id } = req.params;
  const { evilness } = req.body;

  // 6. PROMISE RESOLVE/REJECT EXAMPLE
  new Promise((resolve, reject) => {
    if (evilness > 10) {
      reject(new Error("No cat can be more than 10/10 evil!"));
    } else {
      pool.query('UPDATE cats SET evilness = ? WHERE id = ?', [evilness, id])
        .then(resolve);
    }
  })
  .then(() => res.send(`Cat ${id} is now ${evilness}/10 evil!`))
  .catch(err => res.status(400).send(err.message));
});

app.listen(3000, () => console.log('Pet shop running on http://localhost:3000'));