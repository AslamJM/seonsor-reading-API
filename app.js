const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
const csvtojson = require("csvtojson");
const csvPath = "feeds.csv";
app.use(express.json());

const convertJSON = () => {
  csvtojson()
    .fromFile(csvPath)
    .then((jsonData) => {
      fs.writeFileSync(
        "output.json",
        JSON.stringify(jsonData),
        "utf-8",
        (err) => {
          if (err) console.log(err);
        }
      );
    });
};

const readJSON = () => {
  const data = fs.readFileSync("output.json", "utf-8");
  const json = JSON.parse(data);
  return json;
};

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/readings", (req, res) => {
  convertJSON();
  const data = readJSON();
  res.json(data);
});
app.listen(port, () => {
  console.log("server is listening ...");
});
