# csvTableView
A Javascript csv parser that will display the data as a table in HTML

Open the html file in your favorite browser to get started. Try the supplied sample.csv and see how the table looks. Visual elements to the table can be controlled in the styles/sheet.css style sheet.

This is a basic viewer for standard files in a Comma Separated Value format. The viewer will read in the data from an uploaded .csv file and tabularize it, displaying the table in the browser. This is mainly a proof-of-concept. The app should probably not parse the CSV data and display it all on the client side like this script does. No checks or santization is done in this version.

This script assumes that the headers for the table are in the first row of the CSV file, and displays the remaining rows as records with an alternating background color.
