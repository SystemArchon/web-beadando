const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "I4CUD1pop666";

function getData() {
    const formData = new FormData();
    formData.append("op", "read");
    formData.append("code", CODE);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => renderTable(data.list, data))
    .catch(err => console.error("Hiba:", err));
}

function createData() {
    const name = document.getElementById("name").value.trim();
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();

    if (!validateInputs(name, height, weight)) return;

    const formData = new FormData();
    formData.append("op", "create");
    formData.append("code", CODE);
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);

    fetch(API_URL, { method: "POST", body: formData })
        .then(res => res.text())
        .then(msg => {
            alert("Létrehozás: " + msg);
            getData();
        });
}

function updateData() {
    const id = document.getElementById("id").value.trim();
    const name = document.getElementById("name").value.trim();
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();

    if (!id || !validateInputs(name, height, weight)) return;

    const formData = new FormData();
    formData.append("op", "update");
    formData.append("code", CODE);
    formData.append("id", id);
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);

    fetch(API_URL, { method: "POST", body: formData })
        .then(res => res.text())
        .then(msg => {
            alert("Módosítás: " + msg);
            getData();
        });
}

function deleteData() {
    const id = document.getElementById("id").value.trim();

    if (!id) {
        alert("Kérlek add meg a törlendő ID-t!");
        return;
    }

    const formData = new FormData();
    formData.append("op", "delete");
    formData.append("code", CODE);
    formData.append("id", id);

    fetch(API_URL, { method: "POST", body: formData })
        .then(res => res.text())
        .then(msg => {
            alert("Törlés: " + msg);
            getData();
        });
}

function renderTable(list, meta) {
    let html = `<p>Rekordok száma: ${meta.rowCount}, Max: ${meta.maxNum}</p>`;
    html += "<table><tr><th>ID</th><th>Név</th><th>Magasság</th><th>Súly</th></tr>";

    let sum = 0, max = 0, min = Infinity, count = 0;

    list.forEach(row => {
        html += `<tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.height}</td>
            <td>${row.weight}</td>
        </tr>`;

        const h = parseFloat(row.height);
        if (!isNaN(h)) {
            sum += h;
            max = Math.max(max, h);
            min = Math.min(min, h);
            count++;
        }
    });

    const avg = count ? (sum / count).toFixed(2) : "N/A";
    html += `</table>
             <p>Magasság statisztika: Összeg=${sum}, Átlag=${avg}, Legnagyobb=${max}</p>`;

    document.getElementById("output").innerHTML = html;
}

function validateInputs(name, height, weight) {
    if (!name || name.length > 30) {
        alert("Név kötelező, max 30 karakter.");
        return false;
    }
    if (!height || isNaN(height)) {
        alert("Hibás magasság.");
        return false;
    }
    if (!weight || isNaN(weight)) {
        alert("Hibás súly.");
        return false;
    }
    return true;
}
