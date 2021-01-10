const axios = require("axios");
const config = require("config");

module.exports = {
  getLocationIpstack: (ip) => {
    let { url, api_key } = config.get("IP_STACK");
    let apiUrl = url + ip + "?access_key=" + api_key;
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
