const express = require("express");
const router = express.Router();
const { listProfiles } = require("../../controllers/amazon/ads.controller");
const { getAccessToken } = require("../../middleware/amazon/auth");
router.get("/listProfiles", getAccessToken, listProfiles);
module.exports = router;
