/* Copyright 2022 ecdestro */

// The 'csvFileInput' ID is an HTML element within the app's HTML user interface.
// That HTML file defines the layout and input type of the file dialog.
// The following code tests to see if the browser is capable of supporting the
// FileReader object, and if so loads the selected csv file into the object.

let upload = document.getElementById('csvFileInput');
upload.onchange = () =>
{
    if(window.FileReader)
    {
        getFileText(upload.files[0]);
    }
    else
    {
        alert('FileReader not supported in this browser');
    }
}

// Function: getFileText(csvfile)
// getFileText() creates a FileReader object called reader, which we can then manipulate.
// In this case, we're sending the Text blob to the filetoDictionary function, which is
// triggered by the event of selecting the file from the file chooser in the app.

function getFileText(csvFile)
{
    let reader = new FileReader();
    reader.readAsText(csvFile);
    reader.onload = filetoDictionary;
}

// Function: filetoDictionary(event)
// filetoDictionary() creates a set of dictionary keys out of the headings of the 
// first line. These keys then get paired to each row of data values so that we can 
// arbitrarily call up any row and it will have a key: value arrangement.
// The rows of key:value pairs are then sent to the resultList() function for parsing.

function filetoDictionary(event)
{
    let csv = event.target.result;
    let csvByLine = csv.split('\n'); // Split csv file into array of lines
    // csvByLine.shift(); // If the first line of your CSV contains metadata, 
    // uncommenting the above line will allow you to shift that off.
    let dataHeadings = csvByLine.shift().split(','); // Create an array of headings
    let rows = [];
    while(csvByLine.length)
    {
        let dataArray = csvByLine.shift().split(','); // Turn each line into an array
        let dataValues = {};

        for(var i = 0; i < dataHeadings.length; i++)
        {
            var key = dataHeadings[i]; // Each heading is now a key in a dictionary
            dataValues[key] = dataArray[i]; // paired with each value in each row
        }
        rows.push(dataValues);
    }
    resultList(rows);
}

// Function: resultList(rows)
// resultList() will generate the table and post it to the tableOutput div in the HTML

function resultList(rows)
{
    document.getElementById('tableOutput').innerHTML = ""; // Clear tableOutput div
    let table = document.createElement('table');
    let results = [];
    let values = [];
    let tableHeader = table.insertRow(-1);
    for (var key in rows)
    {
        results.push(rows[key]);
    }
    for (var row in results)
    {
        values.push(results[row]);
    }
    // If you want to include a leading column to each row, you can uncomment the
    // next three lines
    // let checkBox_element = document.createElement('th');
    // checkBox_element.innerHTML = "CheckBoxes";
    // tableHeader.appendChild(checkBox_element);
    Object.keys(values[0]).forEach((column) => {
        let element = document.createElement('th');
        element.innerHTML = column;
        tableHeader.appendChild(element);
    });
    for (var rows in values)
    {
        let row = table.insertRow(-1);
        // If you wanted to include a checkbox on each row, uncomment these two lines
        // let box = row.insertCell(0);
        // box.innerHTML = "<input type=checkbox name=check id=check>";
        Object.keys(values[0]).forEach((key) => {
            let data = row.insertCell(-1);
            data.appendChild(document.createTextNode(values[rows][key]));
        });
        document.getElementById('tableOutput').appendChild(table);
    }
}