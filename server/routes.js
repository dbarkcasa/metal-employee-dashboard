const express = require('express');
const router = express.Router();
const path = require('path');
const { readFile, writeFile } = require('./fileHandler');
const validate = require('./validation');

const filePath = path.join(__dirname, '..', 'data', 'metal.json');

// GET all metals
router.get('/', async (req, res) => {
    try {
        const metals = await readFile(filePath);
        res.json(metals);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load metals' });
    }
});

// GET single metal
router.get('/:id', async (req, res) => {
    const metals = await readFile(filePath);
    const metal = metals.find(m => m.id === req.params.id);
    if (!metal) return res.status(404).json({ error: 'Metal not found' });
    res.json(metal);
});

// POST metal
router.post('/', async (req, res) => {
    const metals = await readFile(filePath);
    const newMetal = { ...req.body, id: Date.now().toString() };

    const { valid, message } = validate(newMetal);
    if (!valid) return res.status(400).json({ error: message });

    metals.push(newMetal);
    await writeFile(filePath, metals);
    res.json(metals);
});

// PUT metal
router.put('/:id', async (req, res) => {
    const metals = await readFile(filePath);
    const index = metals.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Metal not found' });

    const updatedMetal = { ...metals[index], ...req.body, id: req.params.id };
    const { valid, message } = validate(updatedMetal, true);
    if (!valid) return res.status(400).json({ error: message });

    metals[index] = updatedMetal;
    await writeFile(filePath, metals);
    res.json(metals);
});

// DELETE metal
router.delete('/:id', async (req, res) => {
    const metals = await readFile(filePath);
    const filtered = metals.filter(m => m.id !== req.params.id);
    if (filtered.length === metals.length) return res.status(404).json({ error: 'Metal not found' });

    await writeFile(filePath, filtered);
    res.json(filtered);
});

module.exports = router;
