const express = require('express');
const path = require('path');
const app = express();

// Route imports
const metalRoutes = require('./routes'); 
const employeeRoutes = require('./employeeRoutes');
const reportRoutes = require('./reportRoutes');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api/metal', metalRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/dashboard', reportRoutes);

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
