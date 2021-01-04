module.exports = {
  clientIPAdress: async (req, res, next) => {
    try {
      let forwarded = req.headers["x-forwarded-for"];
      let ip = forwarded
        ? forwarded.split(/, /)[0]
        : req.connection.remoteAddress;
      res.locals.ip = ip;
      next();
    } catch (error) {
      res.status(211).json({ msg: "Unknown incoming IP address." });
    }
  },
};
