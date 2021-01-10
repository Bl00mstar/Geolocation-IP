const api = require("../services/ipstack.service");

module.exports = {
  findLocation: async (req, res) => {
    try {
      const { type } = req.body;
      if (type === "api") {
        let data = await api.getLocationIpstack(res.locals.ip);
        res.json(data);
      } else {
        res.status(500).json({ msg: "Unknown type of request." });
      }
    } catch (error) {
      res.status(500).json({ msg: "Unknown type of request." });
    }
  },
};
