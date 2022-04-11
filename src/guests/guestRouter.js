const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send({ message: "You are under the guest section" });
});

module.exports = router;
