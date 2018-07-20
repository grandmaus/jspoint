const QRCode = require('qrcode');
const ip = require('./utils/ip');

QRCode.toFile(
  'public/qr.png',
  `http://${ip()}:3000/`,
  { dark: '#00F', light: '#000000', width: 400 },
  function(err) {
    console.log(`composed new QR for http://${ip()}:3000/`);
  }
);
