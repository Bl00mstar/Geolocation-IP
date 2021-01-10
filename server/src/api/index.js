const express = require("express");

const ip = require("../controllers/ip.controller");
const location = require("../controllers/location.controller");
const subnet = require("../controllers/subnet.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API",
  });
});

router.get("/subnets", (req, res) => {
  res.json(subnet.restrictedSubnets);
});

router.post("/current_ip", [
  ip.clientIPAdress,
  subnet.isReservedSubnet,
  location.findLocation,
]);

router.post("/check/:input", [
  ip.inputIPAddress,
  subnet.isReservedSubnet,
  location.findLocation,
]);

module.exports = router;
