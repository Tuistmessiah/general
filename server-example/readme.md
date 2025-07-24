# Pet Shop API - Node/Express Learning Example

## Quick Start

1. **Database Setup**:
   - Open MySQL Workbench
   - Run the SQL queries from `pet_shop.sql` to create the database and tables
   - Replace `YOUR_PASSWORD` in the code with your local MySQL password

2. **Install Dependencies**:
    ```bash
    npm install # All mentioned in package.json
    ```

3. **Run the Server**:

    ```bash
    npm run dev  # For development (with nodemon, allows hot reload)
    # OR
    npm start    # For production
    ```
   - API will be available at: http://localhost:3000

## API Map


## 📚 Core Concepts Explained

#### Links / Resources / Study / Practice
  - [Node](https://www.w3schools.com/nodejs/default.asp)
    - [Node.js - Event Loop in depth](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
    - [NPM](https://www.w3schools.com/nodejs/nodejs_npm.asp)
    - [Express](https://www.w3schools.com/nodejs/nodejs_express.asp)
  - [Javascript](https://www.w3schools.com/js/default.asp)
    - [this - keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
    - [Callbacks](https://www.w3schools.com/js/js_callback.asp)

### 🔮 Promises
Promises handle asynchronous operations with three states:
- **Pending**: Initial state
- **Resolved**: Operation completed successfully (`.then()`)
- **Rejected**: Operation failed (`.catch()`)

**Example in Code**:
```javascript
// mysql2/promise returns promises for queries
pool.query('SELECT * FROM cats')
  .then(([rows]) => res.json(rows)) // Resolved
  .catch(err => next(err));         // Rejected
```

### 🔄 Async/Await vs .then()
Two ways to handle promises:

```javascript
// 1. Async/Await (cleaner for sequential operations)
async function getCats() {
  const [rows] = await pool.query('SELECT * FROM cats');
  return rows;
}

// 2. .then() (better for parallel operations)
function getCats() {
  return pool.query('SELECT * FROM cats')
    .then(([rows]) => rows);
}
```

**Key differences**:
- **Async/Await**: 
  - Uses `async`/`await` keywords
  - Looks synchronous but works asynchronously
  - Better for sequential operations
  - Requires try/catch for error handling

- **.then()**:
  - Uses promise chaining
  - Better for parallel operations with `Promise.all()`
  - Uses `.catch()` for error handling

### 🛣️ Express Basics
- **Middleware**: Functions that process requests before they reach routes
```javascript
app.use(express.json()); // Parses JSON bodies
app.use(logRequests);    // Custom middleware
```
- **Route Handlers**:
```javascript
app.METHOD(PATH, HANDLER)
// Example:
app.get('/cats', async (req, res) => { ... })
```

### 🧩 Request/Response Objects

| Component | Purpose | Example |
|-----------|---------|---------|
| `req` | Incoming request | `req.params.id` |
| `res` | Outgoing response | `res.status(201).send()` |
| `next` | Pass to next middleware | `next(err)` |

**Key Properties**:
- `req.params`: Route parameters
- `req.query`: URL query parameters
- `req.body`: Request payload (needs body-parser middleware)
- `res.status()`: Set HTTP status code
- `res.json()`: Send JSON response


### ⏳ Event Loop

JavaScript executes code in this order:
1. **Synchronous code** (top-to-bottom execution)
2. **Microtasks**:
   - Promise callbacks (`.then()`, `.catch()`)
   - `queueMicrotask()`
   - `process.nextTick()` (Node.js specific)
3. **Macrotasks**:
   - `setTimeout`
   - `setInterval`
   - I/O operations

Examples of sync & async processes:
```javascript
console.log('Start'); // 1. Synchronous
setTimeout(() => console.log('Timeout'), 0); // 3. Macrotask
Promise.resolve().then(() => console.log('Promise')); // 2. Microtask
console.log('End'); // 1. Synchronous
```

### 🛡️ Error Handling
Always wrap async code in try/catch:

```javascript
try {
  await pool.query('INSERT...');
} catch (err) {
  next(err); // Pass to error handler
}
```

### 📦 Key Dependencies

| Package | Purpose | Alternative |
|---------|---------|-------------|
| `express` | Web framework | Fastify, Koa |
| `mysql2` | MySQL driver | PostgreSQL, MongoDB |
| `axios` | HTTP client | `fetch`, `got` |
| `nodemon` | Dev restart | `ts-node-dev` |

**Installation**:
```bash
npm install express mysql2 axios
npm install nodemon --save-dev
```
Some dependencies do not need to run in runtime or be sent as an artifact for deployment, so they are installed as `dev dependencies`, just to help with development. Some examples are `nodemon`, `jest`, `node-sass`.

In your `package.json` you will see them listed separately
```json
"dependencies": {
  "axios": "^1.11.0",
  "express": "^5.1.0",
  "mysql2": "^3.14.2"
},
"devDependencies": {
  "nodemon": "^3.1.10"
}
```

### 🐾 API Endpoints

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET    | `/cats`  | Get all cats | `GET http://localhost:3000/cats` |
| POST   | `/cats`  | Add new cat  | `POST http://localhost:3000/cats` with JSON body |
| PUT    | `/cats/:id` | Update cat evilness | `PUT http://localhost:3000/cats/5` with `{ "evilness": 8 }` |
| GET    | `/random-dogs/:count` | Get random dog images | `GET http://localhost:3000/random-dogs/3` |

**Sample Request Body** (for POST /cats):
```json
{
  "name": "Whiskers",
  "breed": "Siamese",
  "evilness": 7
}
```

### 💡 More Concepts in This Project

#### 1. **Spread Operator**
```javascript
// Object spread (merge objects)
// req.body -> { name: 'Mr. Whiskers', breed: 'siamese' }
const newCat = { evilness: 5, ...req.body };
// newCat -> { evilness: 5, name: 'Mr. Whiskers', breed: 'siamese' }

// Array spread (merge arrays)
const arrayA = ['A', 4];
const arrayB = [true, 1, 2];
const result = [...arrayA, ...arrayB]
// result -> ['A', 4, true, 1, 2]
```
#### 2. Promise.all()
```javascript
// Fetch multiple dogs in parallel
const dogPromises = [...Array(5)].map(() => fetchRandomDog());
const dogs = await Promise.all(dogPromises);
```
#### 3. Middleware Chaining
```javascript
// Executes in order:
app.use(express.json());     // 1. Parse JSON bodies
app.use(logRequests);       // 2. Log incoming requests
app.use(authMiddleware);    // 3. Check authentication
```

#### 4. HTTP Status Codes

| Code | Meaning | Typical Use |
|------|---------|-------------|
| 200 | OK | Successful GET requests |
| 201 | Created | Successful resource creation |
| 400 | Bad Request | Invalid client input |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected server issues |

### 🎯 Context and `this` in JavaScript

In JavaScript, `this` refers to the **execution context** and its value depends on **how a function is called**:

#### **Common Scenarios**
1. **Global Context**  
```javascript
console.log(this); // `window` (browser) or `global` (Node.js)
```
2. **Object Method**

```javascript
const cat = {
  name: 'Whiskers',
  meow() { console.log(`${this.name} says meow!`); }
};
cat.meow(); // "Whiskers says meow!" (`this` = `cat`)
```
2. **Arrow Functions**

```javascript
const dog = {
  name: 'Rex',
  bark: () => console.log(`${this.name} says woof!`) // ❌ `this` is inherited from outer scope
};
dog.bark(); // "undefined says woof!"
```

2. **Event Listeners (Frontend)**

```javascript
button.addEventListener('click', function() {
  console.log(this); // `button` element
});
```
