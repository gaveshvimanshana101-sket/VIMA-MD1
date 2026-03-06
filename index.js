const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const P = require("pino")
const config = require("./config")

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("session")

const sock = makeWASocket({
logger: P({ level: "silent" }),
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]
if(!msg.message) return

const text = msg.message.conversation || msg.message.extendedTextMessage?.text

if(!text) return

// MENU
if(text === config.PREFIX + "menu"){
await sock.sendMessage(msg.key.remoteJid,{
text:`╭━━〔 ${config.BOT_NAME} 〕━━⬣
🤖 AI
.ai <text>

📥 Downloader
.tiktok <link>
.fb <link>
.yt <link>

⚙ System
.alive
.ping
╰━━━━━━━━⬣`
})
}

// ALIVE
if(text === config.PREFIX + "alive"){
await sock.sendMessage(msg.key.remoteJid,{
text:`🤖 ${config.BOT_NAME} is Online`
})
}

})

}

startBot()
