import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
let biot = bio.status?.toString() || 'Sin Info'
const date = moment.tz('America/Bogota').format('DD/MM/YYYY')
const time = moment.tz('America/Argentina/Buenos_Aires').format('LT')
let api = await axios.get(`https://deliriusapi-official.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
let userNationalityData = api.data.result
let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
let user = db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let name2 = conn.getName(m.sender)

if (command == 'verify' || command == 'reg' || command == 'verificar') {
if (user.registered === true) throw `*Ya estás registrado 🤨*`
if (!Reg.test(text)) throw `*⚠️ ¿No sabes cómo usar este comando?* Sigue estos pasos:\n\n• Unirte al grupo:\n${nn}\n• Después usa el comando de la siguiente manera: *${usedPrefix + command} nombre.edad*\n*• Ejemplo:* ${usedPrefix + command} ${name2}.16`
  
/*let groupID = '120363043118239234@g.us'; 
let groupMetadata = await conn.groupMetadata(groupID);
let groupMembers = groupMetadata.participants.map(participant => participant.id || participant.jid); //
  
if (!groupMembers.includes(m.sender)) {
throw `*⚠️ ¿No sabes cómo usar este comando?* Antes de registrarte primero debes unirte al grupo requerido:*\nhttps://chat.whatsapp.com/HNDVUxHphPzG3cJHIwCaX5\n\n*• Después usar el comando de la siguiente manera:*\n> ${usedPrefix + command} nombre.edad`;
}*/

let [_, name, splitter, age] = text.match(Reg);
if (!name) throw '*¿Y el nombre?*'
if (!age) throw '*La edad no puede estar vacía, agrega tu edad*'
if (name.length >= 45) throw '*¿Qué?, ¿tan largo va a ser tu nombre?*'
  
age = parseInt(age);
if (age > 100) throw '👴🏻 ¡Estás muy viejo para esto!'
if (age < 5) throw '🚼 ¿Los bebés saben escribir? ✍️😳'

user.name = name.trim();
user.age = age;
user.regTime = +new Date();
user.registered = true;
global.db.data.users[m.sender].money += 400;
global.db.data.users[m.sender].limit += 2;
global.db.data.users[m.sender].exp += 150;
global.db.data.users[m.sender].joincount += 2;
  
let sn = createHash('md5').update(m.sender).digest('hex');
await conn.reply(m.chat, `[ ✅ REGISTRO COMPLETADO ]

◉ *Nombre:* ${name}
◉ *Edad:* ${age} años
◉ *Hora:* ${time} 🇦🇷
◉ *Fecha:* ${date}
◉ *País:* ${userNationality}
◉ *Número:* wa.me/${who.split`@`[0]}
◉ *Número de serie:*
⤷ ${sn}

🎁 *Recompensa:*
⤷ 2 diamantes 💎
⤷ 400 Coins 🪙
⤷ 150 exp

*◉ Para ver los comandos del bot usar:*
${usedPrefix}menu

◉ *Total de usuarios registrados:* ${rtotalreg}`, m, { contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: `𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎`, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: [nna, nn, md, yt, tiktok].getRandom() }}})
await m.reply(`${sn}`);
}

if (command == 'nserie' || command == 'myns' || command == 'sn') {
let sn = createHash('md5').update(m.sender).digest('hex')
conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', `⬇️ ᴇsᴛᴇ ᴇs sᴜs ɴᴜᴍᴇʀᴏ ᴅᴇʟ sᴇʀɪᴇ ⬇️`, 'status@broadcast')
}

if (command == 'unreg') {
if (!args[0]) throw `✳️ *Ingrese número de serie*\nVerifique su número de serie con el comando...\n\n*${usedPrefix}nserie*`
let user = global.db.data.users[m.sender]
let sn = createHash('md5').update(m.sender).digest('hex')
if (args[0] !== sn) throw '⚠️ *Número de serie incorrecto*'
global.db.data.users[m.sender].money -= 400
global.db.data.users[m.sender].limit -= 2
global.db.data.users[m.sender].exp -= 150
global.db.data.users[m.sender].joincount -= 2  
user.registered = false
m.reply(`✅ ᴿᵉᵍᶦˢᵗʳᵒ ᵉˡᶦᵐᶦⁿᵃᵈᵒ`)
}}
handler.help = ['reg', 'verificar', 'myns', 'nserie', 'unreg']
handler.tags = ['rg']
handler.command = /^(nserie|unreg|sn|myns|verify|verificar|registrar|reg(ister)?)$/i
export default handler