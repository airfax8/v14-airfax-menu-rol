const { EmbedBuilder, SelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const config = require(`../config.js`)

exports.run = async (client, msg) => {
    if (!msg.member.permissions.has("Administrator")) return msg.channel.reply({ content: ` bu komutu kullanmak için \`Administrator\` yetkisine sahip olmalısın.`})

    const rolembed = new EmbedBuilder()
    .setAuthor({ name: `${msg.guild.name} Rol Menüsü`})
    .setColor("Random")
    .setFooter({ text: `${config.Footer}`})
    .setThumbnail(msg.guild.iconURL())
    .setDescription(`Sunucumuzda bildirimlerden diğer üyelerden daha önce haberdar olmak istiyorsan aşağıdaki menüden <@&${config.etkinlikKatılımcısı}> & <@&${config.cekilisKatılımcısı}> & <@&${config.duyurubildirim}>rolünü üzerine ekleyebilirsin`)
    const roles = new SelectMenuBuilder()
    .setCustomId("ecrol")
    .setPlaceholder(`Etkinlik/Çekiliş Katılımcısı Rol Menüsü`)
    .setMinValues(1)
    .setMaxValues(2)
    .addOptions(
        {
            label: "Etkinlik Katılımcısı",
            value: "e_katilimcisi",
            description: "@Etkinlik Katılımcısı rolünü üzerinize alırsınız"
        }, 
        {
            label: "Çekiliş Katılımcısı",
            value: "c_katilimcisi",
            description: "@Çekiliş Katılımcısı rolünü üzerinize alırsınız"
        },
        {
            label: "Duyuru Bildirim",
            value: "d_bildirim",
            description: "Duyuru Bildirim rolünü üzerinize alırsınız"
        },
        {
            label: "Rol İstemiyorum",
            value: "rol_cikar",
            description: "E/C rolleriniz üzerinizden alır"
        }
    )
    const row2 = new ActionRowBuilder()
    .addComponents(roles)

    msg.channel.send({ embeds: [rolembed], components: [row2]})

};
exports.conf = {
  aliases: ["rol-menü"]
};

exports.help = {
  name: "menü-rol"
};