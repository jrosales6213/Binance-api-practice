const express = require("express");
const { google } = require("googleapis");
const cors = require('cors');

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });
app.get("/" , function (req , res) {
  res.sendFile(__dirname + "/index.html");
})

app.get("/", async (req, res) => {
 
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1lzD6t-idEpmq6VVLKr1E3csuc9vc-vkPD3psr7VDJpY";

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet2!A:E",
  });

  // Write row(s) to spreadsheet
  // await googleSheets.spreadsheets.values.append({
  //   auth,
  //   spreadsheetId,
  //   range: "Sheet1!A:B",
  //   valueInputOption: "USER_ENTERED",
  //   resource: {
  //     values: [[request, date]],
  //   },
  // });
  const newData = getRows.data

  res.send(newData);
});

app.listen(3000, (req, res) => console.log("running on 3000"));