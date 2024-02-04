document.getElementById('csvInput').addEventListener('change', handleFile);

function handleFile(event) {
    const fileInput = event.target;
    const fileList = fileInput.files;

    if (fileList.length > 0) {
        const file = fileList[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvData = e.target.result;
            const tableData = parseCSV(csvData)
            displayCSV(tableData);
        };

        reader.readAsText(file);
    }
}

function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headings = lines[0].split(',');
    const tableData = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};

        for (let j = 0; j < headings.length; j++) {
            row[headings[j]] = values[j];
        }

        tableData.push(row);
    }
    
    return tableData;
}

function displayCSV(tableData) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'csvTable';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    for (const heading in tableData[0]) {
        const th = document.createElement('th');
        th.textContent = heading;
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const row of tableData) {
        const tr = document.createElement('tr');

        for (const heading in row) {
            const td = document.createElement('td');
            td.textContent = row[heading];
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}