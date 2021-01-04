const express = require("express");
const router = express.Router();

const subnet = require("../middleware/subnet");
const clientIP = require("../middleware/clientIPAddress");
const inputIP = require("../middleware/searchIPDomain");

const locationController = require("../controllers/location.controllers");

router.post("/check/:input", [
  inputIP.inputIPAddress,
  subnet.isReservedSubnet,
  locationController.mainLocation,
]);

router.post("/current_ip", [
  clientIP.clientIPAdress,
  subnet.isReservedSubnet,
  locationController.mainLocation,
]);

module.exports = router;
