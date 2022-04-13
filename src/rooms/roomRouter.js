const Router = require("express").Router;
const { getRooms, createRoom } = require("./roomController");
const router = Router();

router.get("/", getRooms);

router.post("/create", createRoom);

module.exports = router;
