let editingEmpID = null;

// Fetch and display all employee records
async function fetchEmployees() {
    const res = await fetch('/api/employees');
    const data = await res.json();

    const tbody = document.getElementById('employeeTable');
    tbody.innerHTML = '';

    data.forEach(emp => {
        const safeName = emp.name.replace(/"/g, '&quot;');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.hours ?? 0}</td>
            <td>${emp.rate ?? 0}</td>
            <td>
                <button onclick="editEmployee('${emp.id}', '${safeName}', ${emp.hours ?? 0}, ${emp.rate ?? 0})">Edit</button>
                <button onclick="deleteEmployee('${emp.id}')">Delete</button>
            </td>`;
        tbody.appendChild(row);
    });
}

// Handle submission of Employee Form (Add or Update)
document.getElementById('employeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    function hasSQLInjection(input) {
        const pattern = /('|--|;|\b(OR|AND|SELECT|INSERT|DELETE|UPDATE|DROP|UNION|WHERE|FROM|LIKE|=|1=1|exec|xp_')\b)/gi;
        return pattern.test(input);
    }

    const name = document.getElementById('empName').value.trim();
    const hours = parseFloat(document.getElementById('empHours').value);
    const rate = parseFloat(document.getElementById('empRate').value);

    const sanitizedName = name
        .replace(/['";=]/g, '')
        .replace(/\b(SELECT|DROP|UNION|--|INSERT|DELETE|UPDATE)\b/gi, '');

    if (!sanitizedName || isNaN(hours) || isNaN(rate)) {
        alert('All fields are required and must be valid numbers.');
        return;
    }

    if (hasSQLInjection(sanitizedName)) {
        alert('Invalid input detected. Please avoid using SQL keywords or symbols.');
        return;
    }

    const emp = { name, hours, rate };

    if (editingEmpID) {
        await fetch(`/api/employees/${editingEmpID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emp),
        });
        editingEmpID = null;
        document.querySelector('#employeeForm button').innerText = 'Add Employee';
    } else {
        await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emp),
        });
    }

    e.target.reset();
    fetchEmployees();
});

// Load data into form for editing
function editEmployee(id, name, hours, rate) {
    document.getElementById('empName').value = name || '';
    document.getElementById('empHours').value = hours || 0;
    document.getElementById('empRate').value = rate || 0;

    editingEmpID = id;
    document.querySelector('#employeeForm button').innerText = 'Update Employee';
}

// Delete employee
async function deleteEmployee(id) {
    if (confirm("Delete this employee?")) {
        await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
        });
        fetchEmployees();
    }
}

// Initial load
fetchEmployees();
