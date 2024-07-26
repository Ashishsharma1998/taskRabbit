const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./databaseConfig");
const authRoute = require("./routes/auth");
const imageUploadRoute = require("./routes/imageupload");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const PORT = 4000 || process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/image", imageUploadRoute);

app.listen(PORT, async () => {
  console.log("server is up and running at port ", PORT);
  await connectDB();
});
