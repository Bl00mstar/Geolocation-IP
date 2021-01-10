const dns = require("dns");
const ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const ipv6Block = /^[0-9A-F]{1,4}$/i;
const regexDomain = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/i;

const assertString = (input) => {
  const isString = typeof input === "string" || input instanceof String;
  if (!isString) {
    let invalidType = typeof input;
    if (input === null) invalidType = "null";
    else if (invalidType === "object") invalidType = input.constructor.name;
    throw new TypeError(`Expected a string but received a ${invalidType}`);
  }
  return input;
};

const resolveDNStoIP = (serverName) => {
  return new Promise((resolve, reject) => {
    dns.lookup(serverName, (err, address) => {
      if (err) reject(err);
      resolve(address);
    });
  });
};

const checkType = async (value) => {
  if (!regexDomain.test(value)) {
    return value;
  }
  let ip = await resolveDNStoIP(value);
  return ip;
};

const isIP = (str, version = "") => {
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === "4") {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    const parts = str.split(".").sort((a, b) => a - b);
    return parts[3] <= 255;
  } else if (version === "6") {
    let addressAndZone = [str];
    if (str.includes("%")) {
      addressAndZone = str.split("%");
      if (addressAndZone.length !== 2) {
        return false;
      }
      if (!addressAndZone[0].includes(":")) {
        return false;
      }

      if (addressAndZone[1] === "") {
        return false;
      }
    }

    const blocks = addressAndZone[0].split(":");
    let foundOmissionBlock = false;
    const foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    const expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    if (str === "::") {
      return true;
    } else if (str.substr(0, 2) === "::") {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === "::") {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (let i = 0; i < blocks.length; ++i) {
      if (blocks[i] === "" && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false;
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
};

module.exports = {
  inputIPAddress: async (req, res, next) => {
    try {
      let value = await assertString(req.params.input);
      let ipMaybe = await checkType(value);
      if (isIP(ipMaybe)) {
        res.locals.ip = ipMaybe;
        next();
      } else {
        res.status(500).json({ msg: "It is not a valid IP Address." });
      }
    } catch (error) {
      res.status(500).json({ msg: "It is not a valid IP Address." });
    }
  },
  clientIPAdress: async (req, res, next) => {
    try {
      let forwarded = req.headers["x-forwarded-for"];
      let ip = forwarded
        ? forwarded.split(/, /)[0]
        : req.connection.remoteAddress;
      res.locals.ip = ip;
      next();
    } catch (error) {
      res.status(500).json({ msg: "Unknown incoming IP address." });
    }
  },
};
