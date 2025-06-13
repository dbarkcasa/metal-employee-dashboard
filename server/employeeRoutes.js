const express = require('express');
const router = express.Router();
const path = require('path');
const { readFile, writeFile } = require('./fileHandler');
const validate = require('./validation');

const filePath = path.join(__dirname, '..', 'data', 'employees.json');

// GET all employees
router.get('/', async (req, res) => {
    const employees = await readFile(filePath);
    res.json(employees);
});

// POST employee
router.post('/', async (req, res) => {
    try {
        const employees = await readFile(filePath);
        const newEmp = { ...req.body, id: Date.now().toString() };

        const { valid, message } = validate(newEmp);
        if (!valid) return res.status(400).json({ error: message });

        employees.push(newEmp);
        await writeFile(filePath, employees);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

// PUT employee
router.put('/:id', async (req, res) => {
    try {
        const employees = await readFile(filePath);
        const index = employees.findIndex(emp => emp.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Employee not found' });

        const updatedEmployee = { ...employees[index], ...req.body, id: req.params.id };
        const { valid, message } = validate(updatedEmployee, true);
        if (!valid) return res.status(400).json({ error: message });

        employees[index] = updatedEmployee;
        await writeFile(filePath, employees);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
    try {
        const employees = await readFile(filePath);
        const filtered = employees.filter(emp => emp.id !== req.params.id);
        if (filtered.length === employees.length) return res.status(404).json({ error: 'Employee not found' });

        await writeFile(filePath, filtered);
        res.json(filtered);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

module.exports = router;
