
let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `*¿A quien le doy una advertencia?* etiqueta a la persona con el @tag`
        if (!(who in global.db.data.users)) throw `*⚠️ ¿Quien carajo es ese?* No aparece el mi base de datos`
        let name = conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
            m.reply(`*⚠️ ADVERTENCIA ⚠️*

@${who.split`@`[0]} fuiste advertido por el admins: ${name}
*• Tiene:* ${warn + 1}/${war} advertencia
*• Razon:* ${text}`, null, { mentions: [who] }) 
/*m.reply(`⚠️ *𝙰𝙳𝚅𝙴𝚁𝚃𝙴𝙽𝙲𝙸𝙰* ⚠️
𝚁𝚎𝚌𝚒𝚋𝚒𝚜𝚝𝚎 𝚞𝚗𝚊 𝚊𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊 𝚍𝚎 𝚞𝚗 𝚊𝚍𝚖𝚒𝚗

• *𝚆𝚊𝚛𝚗𝚜:* ${warn + 1}/${war} 
𝚜𝚒 𝚛𝚎𝚌𝚒𝚋𝚎𝚜 *${war}* 𝚊𝚍𝚟𝚎𝚛𝚝𝚎𝚗𝚌𝚒𝚊𝚜 𝚜𝚎𝚛𝚊𝚜 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘 𝚊𝚞𝚝𝚘𝚖𝚊𝚝𝚒𝚌𝚊𝚖𝚎𝚗𝚝𝚎 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘`, who)*/
        } else if (warn == war) {
            global.db.data.users[who].warn = 0
            m.reply(`⚠️ El usuario superó la *${war}* Advertencia por lo tanto sera eliminado del Grupo...`)
            await time(3000)
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
          //  m.reply(`♻️ 𝙵𝚞𝚒𝚜𝚝𝚎 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 *${groupMetadata.subject}* 𝚙𝚘𝚛𝚚𝚞𝚎 𝚑𝚊 𝚜𝚒𝚍𝚘 𝚊𝚍𝚟𝚎𝚛𝚝𝚒𝚍𝚘 *${war}* 𝚟𝚎𝚌𝚎𝚜`, who)
        }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['warn'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
