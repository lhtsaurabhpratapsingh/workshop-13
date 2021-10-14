const express = require("express");
const jwt = require("jsonwebtoken");
const corn = require("node-cron");
const authorize = require("./authorization-middleware");
const config = require("./config");

const app = express();
const port = process.env.PORT || 5000;

// Request a token,
// DISCLAIMER: User should be authenticated!!!
app.get("/token", (req, res) => {
  console.log("Cron Job Started");
  corn.schedule("* * * * *", () => {
    log();
  });
  const payload = {
    name: "Jimmy",
    scopes: "customer:read",
  };

  const token = jwt.sign(payload, config.JWT_SECRET);
  res.send(token);
  res.status(200).json({ "Cron Job": "Started", "Access Token": token });
});

app.get("/customer", authorize("customer:read"), (req, res) => {
  res.send("Customer Information");
});

function log() {
  let today = new Date(Date.now()).toUTCString();
  console.log("The date and time is now " + today);
}

const server = app.listen(port, () => {
  console.log(`Server is listening on ${server.address().port}`);
});
