const express = require('express');
const app = express();

var cors = require('cors');



// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Routes
app.use(require('./routes/pets/index'));
app.use(require('./routes/gastos/index'));


app.listen(3000);
console.log('Server on port 3000!')
