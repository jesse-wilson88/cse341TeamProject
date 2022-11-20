const router = require("express").Router();

// router.use("/", require("./books"));
router.use("/books", require("./books"));
router.use("/api-docs", require("./docs"));

module.exports = router;
