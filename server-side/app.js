const express = require("express");
const cors = require("cors");
const router = require("./Apis/router/router");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/oes", router);

app.listen(process.env.PORT, () => {
  console.log(`Server Sarted At ${process.env.PORT}`);
});
