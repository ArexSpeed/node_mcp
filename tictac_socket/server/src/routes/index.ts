import * as express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("start router");
  res.json({
    "name": "Arek"
  });
});

module.exports = router;
