# Metal & Employee Dashboard

Full-stack Node.js & Express dashboard for managing metal inventory, employee hours, and sales reports.

Live Demo: *(optional if you deploy later)*

## 📂 Project Overview

This project features:

- RESTful backend API using Node.js & Express
- File-based JSON storage for persistence (`data/` folder)
- Frontend CRUD operations for Metal Inventory and Employee Hours
- Dashboard KPI report section (Monthly Sales, Open Orders, Overdue Payments)
- Input sanitization & validation (SQL Injection & XSS protection)
- Responsive UI with clean CSS
- Modular code structure for easy maintenance & scalability

---

## 🏗 Technologies Used

- Node.js
- Express.js
- JavaScript (frontend & backend)
- HTML5 / CSS3
- File System (fs) for data storage

---

## 🗂 File Structure

- `server.js` — main server entry point
- `routes.js` — routes for Metal Inventory
- `employeeRoutes.js` — routes for Employees
- `reportRoutes.js` — routes for Dashboard KPIs
- `validation.js` — backend input sanitization
- `fileHandler.js` — handles reading & writing JSON files
- `public/` — contains frontend files:
  - `index.html` — main page
  - `app.js` — Metal frontend logic
  - `employees.js` — Employee frontend logic
  - `style.css` — frontend styles
- `data/` — contains persistent data files

---

## 🚀 Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/dbarkcasa/metal-employee-dashboard.git
cd metal-employee-dashboard/server
