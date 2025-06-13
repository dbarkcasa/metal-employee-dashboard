let editingMetalId = null;

// Fetch and render all metal entries
async function fetchMetals() {
    const res = await fetch('/api/metal');  // FIXED route
    const data = await res.json();
    const tbody = document.getElementById('metalTable');
    tbody.innerHTML = '';

    data.forEach(metal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${metal.name}</td>
            <td>${metal.quantity}</td>
            <td>${metal.price}</td>
            <td>
                <button class="editMetal" data-id="${metal.id}">Edit</button>
                <button class="deleteMetal" data-id="${metal.id}">Delete</button>
            </td>`;
        tbody.appendChild(row);
    });
}

document.getElementById('metalForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('metalName').value.trim();
    const quantity = parseInt(document.getElementById('metalQty').value, 10);
    const price = parseFloat(document.getElementById('metalPrice').value);

    if (!name || isNaN(quantity) || isNaN(price)) {
        alert('All fields are required and must be valid numbers.');
        return;
    }

    const data = { name, quantity, price };
    const submitButton = e.target.querySelector("button");

    if (editingMetalId) {
        await fetch(`/api/metal/${editingMetalId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        editingMetalId = null;
        submitButton.innerText = "Add Metal";
    } else {
        await fetch('/api/metal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    e.target.reset();
    fetchMetals();
});

// Initial load
fetchMetals();
