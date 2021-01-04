/////////////////////LIST OF SUBNETS/////////////////////
//UNSPECIFIED, BROADCAST, MULTICAST, LINKLOCAL, LOOPBACK/
////////////CARRIERGRADENAT, PRIVATE,RESERVED////////////
const list_of_subnets = [
  "0.0.0.0/8",
  "10.0.0.0/8",
  "100.64.0.0/10",
  "127.0.0.0/8",
  "169.254.0.0/16",
  "172.16.0.0/12",
  "192.0.0.0/24",
  "192.0.2.0/24",
  "192.88.99.0/24",
  "192.168.0.0/16",
  "198.51.100.0/24",
  "203.0.113.0/24",
  "224.0.0.0/4",
  "240.0.0.0/4",
  "255.255.255.255/32",
];

const ip4ToInt = (ip) =>
  ip.split(".").reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;

const isIp4InCidr = (ip) => (cidr) => {
  const [range, bits = 32] = cidr.split("/");
  const mask = ~(2 ** (32 - bits) - 1);
  return (ip4ToInt(ip) & mask) === (ip4ToInt(range) & mask);
};

const isIp4InCidrs = (ip, cidrs) => cidrs.some(isIp4InCidr(ip));

module.exports = {
  isReservedSubnet: (req, res, next) => {
    let value = isIp4InCidrs(res.locals.ip, list_of_subnets);
    value
      ? res
          .status(211)
          .json({ msg: "This IP address is private. Check about section." })
      : next();
  },
};
