const { networkInterfaces } = require('os');
const { writeFile } = require('fs');
const { resolve } = require('path');

function getCurrentIP() {
  const interfaces = networkInterfaces();
  return interfaces['Wi-Fi'].find(iface => iface.family.includes('IPv4')).address;
}

/**
 * Write to JSON, because its the simplest way for react app to know what socket to connect to on local network
 */
writeFile(resolve(__dirname, 'ip.json'), JSON.stringify({ ip: getCurrentIP() }), (e, res) => {
  if (e) throw 'Error';
  console.log('[IP] - WRITTEN LOCAL IP ADRESS TO ip.json');
});

module.exports = getCurrentIP;
