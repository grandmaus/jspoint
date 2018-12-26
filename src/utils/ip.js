const { networkInterfaces } = require('os');
const { writeFile } = require('fs');
const { resolve } = require('path');

/**
 *
 * @param {Array} interfaceType
 * @returns {*}
 */
function extractIP(interfaceType) {
  return interfaceType.find(iface => iface.family.includes('IPv4')).address;
}

function getCurrentIP() {
  const interfaces = networkInterfaces();
  const wifi = interfaces['Wi-Fi'];
  const Ethernet = interfaces['Ethernet'];
  const wirelessNetwork = interfaces['Беспроводная сеть'];

  if (wifi) {
    return extractIP(wifi)
  }
  if (Ethernet) {
    return extractIP(Ethernet)
  }
  if (wirelessNetwork) {
    return extractIP(wirelessNetwork)
  }
}

/**
 * Write to JSON, because its the simplest way for react app to know what socket to connect to on local network
 */
writeFile(resolve(__dirname, 'ip.json'), JSON.stringify({ ip: getCurrentIP() }), (e, res) => {
  if (e) throw 'Error';
  console.log('[IP] - WRITTEN LOCAL IP ADRESS TO ip.json');
});

module.exports = getCurrentIP;
