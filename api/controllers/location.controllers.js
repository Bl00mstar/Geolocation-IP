const api = require("../services/apiIPStack.service");
const customApi = require("../services/customIPStack.service");

module.exports = {
  mainLocation: async (req, res) => {
    try {
      const { type } = req.body;
      if (type === "custom") {
        let data = await customApi.getLocationIpstack(res.locals.ip);
        res.json(data);
      } else if (type === "api") {
        let data = await api.getLocationIpstack(res.locals.ip);
        res.json(data);
      } else {
        res.status(211).json({ msg: "Unknown type of request." });
      }
    } catch (error) {
      res.status(211).json({ msg: "Unknown type of request." });
    }
  },
};
