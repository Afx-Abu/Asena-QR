require('../settings');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
const {makeid, vStore} = require('../lib/scan/Function');
let router = express.Router()
const mongoose = require('mongoose')
let options = {
root:path.join()
}
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore, } = require("@adiwajshing/baileys");
function removeFile(FilePath){
const tmpFiles = fs.readdirSync('./routes/'+FilePath)
         if(tmpFiles.length > 0) tmpFiles.map(v => fs.unlinkSync('./routes/'+FilePath+'/'+v))
      };
router.get('/qr-code', async (req, res) => {
console.log(mongoose.connection.readyState);
mongoose.connect('mongodb+srv://jasilmp00:qEsReyr6NAgPIyK1@cluster0.fr4wicm.mongodb.net')
 .then(() => console.log('Connected!'))
async function Getqr() {
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  try {
    let session = makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: Browsers.macOS("Desktop"),
      auth: state
    });
    session.ev.on("connection.update", async (s) => {
      const { connection, lastDisconnect, qr } = s;
      if(qr){
    await QRCode.toFile('./routes/qr.png', qr, {
    errorCorrectionLevel : "H",
    width : 1200,
    color: {
    dark: '#000000',  // black dots
    light: '#FFFFFF' // white background
           }
        });
      await res.sendFile("/routes/qr.png", {root:"."});
      }
      if (connection == "open") {
        await delay(500);
        await vStore(session.user.id);
        let {encryptedPlainText} = await makeid(session.user.id);
  const reply = async () => { 
     await session.sendMessage(session.user.id, {text:'Asena~'+encryptedPlainText})
  }
    await reply();
    await mongoose.connection.close(function(){console.log("test")})
    await removeFile("auth_info_baileys");
    process.exit(1)
      }
      session.ev.on('creds.update', saveCreds)
      if (
        connection === "close" &&
        lastDisconnect &&
        lastDisconnect.error &&
        lastDisconnect.error.output.statusCode != 401
      ) {
        Getqr();
      }
    });
  } catch (err) {
    // console.log(err);
    await removeFile("auth_info_baileys");
    process.exit(1)
  }
}
await Getqr()
//return //'qr.png', { root: "./" });
});
module.exports = router
