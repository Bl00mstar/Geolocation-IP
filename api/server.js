const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/api", require("./routes/index"));

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server started on port ${port}`));
