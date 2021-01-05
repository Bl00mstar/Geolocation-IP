const api = require("../services/apiIPStack.service");

module.exports = {
  mainLocation: async (req, res) => {
    try {
      const { type } = req.body;
      if (type === "api") {
        let data = await api.getLocationIpstack(res.locals.ip);
        res.json(data);
      } else {
        res.status(211).json({ msg: "Unknown type of request." });
      }
    } catch (error) {
      console.log(error);
      res.status(211).json({ msg: "QUnknown type of request." });
    }
  },
};
