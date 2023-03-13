const { Client, TextInputStyle, ButtonStyle, ButtonBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [ Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const { readdirSync } = require("fs")
const moment = require("moment");
const config = require("./config.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const db = require("orio.db");


module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token).catch(e => {
console.log("Tokeninde Hatan Var Bota bağlanamadı | Airfax")
})

//_______________________________________KOMUTLAR_____________________________________\\

client.on("interactionCreate", async (i) => {

    

    if (i.isSelectMenu()) {
        let choice = i.values[0]
        if (choice === "d_bildirim") {
            if (!i.member.roles.cache.has(config.duyurubildirim)) {
                i.reply({ content: "Duyuru Bildirim rolü üzerinize eklendi", ephemeral: true})
                i.member.roles.add(config.duyurubildirim)
            } else {
                if (i.member.roles.cache.has(config.duyurubildirim)) {
                    i.reply({ content: "Rol zaten üzerinizde var, eğer rolü üzerinizden almak istiyorsanız menüden Rol İstemiyorum seçeneğine tıklayınız.", ephemeral: true})
                }
            }
        }
        if (choice === "c_katilimcisi") {
            if (!i.member.roles.cache.has(config.cekilisKatılımcısı)) {
                i.reply({ content: "Çekiliş Katılımcısı rolü üzerinize eklendi", ephemeral: true})
                i.member.roles.add(config.cekilisKatılımcısı)
            } else {
                if (i.member.roles.cache.has(config.cekilisKatılımcısı)) {
                    i.reply({ content: "Rol zaten üzerinizde var, eğer rolü üzerinizden almak istiyorsanız menüden Rol İstemiyorum seçeneğine tıklayınız.", ephemeral: true})
                }
            }
        }
        if (choice === "e_katilimcisi") {
            if (!i.member.roles.cache.has(config.etkinlikKatılımcısı)) {
                i.reply({ content: "Etkinlik Katılımcısı rolü üzerinize eklendi", ephemeral: true})
                i.member.roles.add(config.etkinlikKatılımcısı)
            } else {
                if (i.member.roles.cache.has(config.etkinlikKatılımcısı)) {
                    i.reply({ content: "Rol zaten üzerinizde var, eğer rolü üzerinizden almak istiyorsanız menüden Rol İstemiyorum seçeneğine tıklayınız", ephemeral: true})
                }
            }
        }
        if (choice === "rol_cikar") {
            if (i.member.roles.cache.has(config.cekilisKatılımcısı) || i.member.roles.cache.has(config.etkinlikKatılımcısı)) {
                i.reply({ content: "Rol üzerinizden alındı", ephemeral: true})
                i.member.roles.remove(config.cekilisKatılımcısı)
                i.member.roles.remove(config.etkinlikKatılımcısı)
            } else {
                if (!i.member.roles.cache.has(config.cekilisKatılımcısı) || !i.member.roles.cache.has(config.etkinlikKatılımcısı)) {
                    i.reply({ content: "Rol zaten üzerinizde yok :face_with_raised_eyebrow:", ephemeral: true})
                }
            }
        } 
    }
}
) 