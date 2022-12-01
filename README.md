# csvTableView
A Javascript csv parser that will display the data as a table in HTML

Open the html file in your favorite browser to get started. Try the supplied sample.csv and see how the table looks. Visual elements to the table can be controlled in the content/ctvsheet.css style sheet.

This is a basic viewer for standard files in a Comma Separated Value format. The viewer will read in the data from an uploaded .csv file and tabularize it, displaying the table in the browser. Functionality such as heading selection, data parsing, etc, can be added into the resultList() function. For instance if you wanted just certain headings:

```javascript
    for (var key in rows)
    {
        if (key === "SomeHeading")
        {
            results.push(rows[key]);
        }
    }
```

From there the rest of the code is extensible for whatever data you want the table to display. A further version of the app may include an export feature to save the resulting table as yet another csv, or some other format.
