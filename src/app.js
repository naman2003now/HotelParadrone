const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/guests", require("./guests/guestRouter"));

app.get("/", () => {
    console.log("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
