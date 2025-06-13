const express = require('express');
const router = express.Router();
const path = require('path');
const { readFile } = require('./fileHandler');

const filePath = path.join(__dirname, '..', 'data', 'dashboard.json');

router.get('/', async (req, res) => {
    try {
        const data = await readFile(filePath);
        res.json(data);
    } catch (err) {
        console.error('Error reading dashboard.json:', err);
        res.status(500).json({ error: 'Failed to load dashboard data' });
    }
});

module.exports = router;
