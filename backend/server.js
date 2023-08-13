const express = require('express');
const cors = require('cors');
require('dotenv').config()
const employeeRoutes = require('./routes/employeeRoute');

const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Middlewares
app.use(express.json());
app.use(cors())

// All Routes
app.use('/api/v1', employeeRoutes);

// Error handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
