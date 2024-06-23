const crypto = require("crypto");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env?.port || 8000;

// Example strong GitHub webhook secret
const secret = "dL5fR9@tM3P1wB7hA8gK#zX$";

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

// Apply middleware
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(bodyParser.json());

// Middleware to verify GitHub signature
app.use((req, res, next) => {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return res.status(403).send("Forbidden");

  const hash = `sha256=${crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex")}`;

  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hash)))
    return next();
  else return res.status(403).send("Forbidden");
});

app.post("/webhook", (req, res) => {
  // Execute your script here
  console.log("Received webhook event");
  exec("sh ./update-repo.sh", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send("Internal Server Error");
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.status(200).send("Webhook received and script executed");
  });
});

app.listen(PORT, () => {
  console.log(`Webhook service running at localhost:${PORT}`);
});
