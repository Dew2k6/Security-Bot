const client = require("../index");
const { MessageEmbed, Collection, MessageAttachment } = require("discord.js")
const f = require("node-fetch")
const { createCanvas, loadImage } = require('canvas')
const { Captcha } = require(`captcha-canvas`);
const model = require("../models/verifysystem")

client.on("interactionCreate", async (interaction) => {
  let verify_text1;
  let verify_text;
  let Guild;
  let user;
  let Role;

  model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
    if(!data) return;

    if(interaction.customId == "verify_start") {
      if(interaction.member.roles.cache.has(data.Role)) return interaction.reply({ 
        content: `<:no:897849877810274324> You are already verified for **${interaction.guild.name}**!`, 
        ephemeral: true 
      })

      Role = data.Role;
      user = interaction.user;
      Guild = interaction.guild;

      const captcha = new Captcha();
      captcha.async = false
      captcha.addDecoy()
      captcha.drawTrace()
      captcha.drawCaptcha()
      const buffer = captcha.png
      const attachment = new MessageAttachment(buffer, `${captcha.text}_Captcha.png`)

      const embed = new MessageEmbed()
      .setColor(`BLUE`)
      .setAuthor(`${interaction.user.tag} - Verification Process`, interaction.user.displayAvatarURL())
      .setTitle(`Respond to the Captcha below Correctly!`)
      .setImage(`attachment://${captcha.text}_Captcha.png`)
      .setFooter(`⏲️ You have 60 seconds to respond. Or it will be cancelled!`)

      interaction.reply({ content: `**Please Check your DMs! If you didn'nt get one, Open them!**`, ephemeral: true })

      interaction.user.send({ embeds: [embed], files: [attachment] }).then((msg) => {
        msg.channel.awaitMessages({
          max: 1,
          time: 60000,
          errors: ["time"]
        }).then(async(m) => {
          if (m.first().content.trim().toLowerCase() == captcha.text.toLowerCase()){
            const embed = new MessageEmbed()
      .setColor(`GREEN`)
      .setAuthor(`${interaction.user.tag} - Verification PASSED`, interaction.user.displayAvatarURL())
      .setTitle(`✅ You passed the Verification Test!`)
              .setImage(`https://cdn.discordapp.com/attachments/953511174899634186/1073843971652075550/Untitled_design_1.png`)
      .setFooter(`You now will have access to ${Guild.name}!`)
            user.send({ embeds: [embed] })
            return interaction.member.roles.add(Role)
          } else {
            if(interaction.member.guild.invites.cache.filter(i => i?.code && (i?.maxAge === 0 || i?.maxAge > 600)).size < 1)
                  await interaction.member.guild.invites.fetch().catch(() => {});
                //if there is a valid invite which lasts for at least 10 minutes or forever
                if(interaction.member.guild.invites.cache.filter(i => i?.code && (i?.maxAge === 0 || i?.maxAge > 600)).size > 0){
            const embed = new MessageEmbed()
            .setColor(`RED`)
            .setAuthor(`${interaction.user.tag} - Verification FAILED`, interaction.user.displayAvatarURL())
            .setTitle(`❌ That was wrong! Please try again.`)
            .setDescription(`The correct answer was: \`${captcha.text}\`!`)
              .setImage(`https://cdn.discordapp.com/attachments/953511174899634186/1073843674779222116/Untitled_design.png`)
            .setFooter(`Press the Verify button again to re-try.`)
            user.send({ content: `New Server Invite (I Kicked you for Security): https://discord.gg/${interaction.member.guild.invites.cache.filter(i => i?.code && i?.maxAge === 0).first().code}`, embeds: [embed] })
            interaction.member.kick(`Failed Verification Test!`)
                }
         
          
        }
      })
    })
  }
})
})