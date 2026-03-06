const axios = require("axios")

async function tiktok(link){

const res = await axios.get(`https://api.dylux.xyz/download/tiktok?url=${link}`)

return res.data

}

module.exports = { tiktok }
