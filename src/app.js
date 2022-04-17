const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/guests", require("./guests/guestRouter"));
app.use("/rooms", require("./rooms/roomRouter"));
app.use("/bookings", require("./bookings/bookingRouter"));
app.use("/employees", require("./employees/employeeRouter"));
app.use("/services", require("./services/serviceRouter"));

app.get("/", () => {
    console.log("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
