let editingIndex = null;
const form = document.getElementById("dataForm");
const tableBody = document.querySelector("#dataTable tbody");
const searchInput = document.getElementById("searchInput");

let data = [
    { id: 1, name: "Gipsz Jakab", age: 25, city: "Budapest", email: "gipsz@hotmail.com" },
    { id: 2, name: "Teszt Elek", age: 32, city: "Debrecen", email: "teszt@hotmail.com" },
    { id: 3, name: "Alma Béla", age: 29, city: "Szeged", email: "alma@hotmail.com" },
    { id: 4, name: "Kókusz Edit", age: 22, city: "Pécs", email: "kokusz@hotmail.com" }
  ];

  renderTable();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const entry = Object.fromEntries(formData.entries());

    if (editingIndex !== null) {
        data[editingIndex] = entry;
        editingIndex = null;
    } else {
        data.push(entry);
    }

    form.reset();
    renderTable();
});

function renderTable(filtered = data) {
    tableBody.innerHTML = "";
    filtered.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.city}</td>
            <td>${row.email}</td>
            <td>
                <button onclick="editRow(${index})">✏️</button>
                <button onclick="deleteRow(${index})">🗑️</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function editRow(index) {
    const row = data[index];
    form.name.value = row.name;
    form.age.value = row.age;
    form.city.value = row.city;
    form.email.value = row.email;
    editingIndex = index;
}

function deleteRow(index) {
    data.splice(index, 1);
    renderTable();
}

searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();
    const filtered = data.filter(row =>
        Object.values(row).some(val =>
            String(val).toLowerCase().includes(search)
        )
    );
    renderTable(filtered);
});

document.querySelectorAll("#dataTable th[data-column]").forEach(th => {
    th.addEventListener("click", () => {
        const column = th.dataset.column;
        data.sort((a, b) => a[column].localeCompare(b[column], undefined, { numeric: true }));
        renderTable();
    });
});
