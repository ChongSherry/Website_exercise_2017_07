const express = require("express");

router = express.Router();

router.get("/", (req, res) => {
    return next.render(req, res, '/index', req.query);
});



module.exports = router;
