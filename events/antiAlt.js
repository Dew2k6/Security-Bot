const model = require("../models/antialt")
const { MessageEmbed, Collection, MessageAttachment } = require("discord.js")
const client = require("../index")
const model1 = require("../models/logging")
const day = require("dayjs");
let time;

client.on("guildMemberAdd", async(member) => {
  model.findOne({Guild:member.guild.id}, async(err, data) => {
    if(!data) return;

    let difference = day(new Date()).diff(member.user.createdAt, 'day')
    time = data.Days;
    if(difference < data.Days){
      const embed = new MessageEmbed()
      .setColor(`RED`)
      .setAuthor(`${member.user.tag} - Account Age too Young`, member.user.displayAvatarURL())
      .setTitle(`❌ Your account is too young for **${member.guild.name}**!`)
      .setDescription(`Your account age is \`${difference}\` days old, but the requirement is \`${data.Days}\` days!`)
        .setImage(`https://cdn.discordapp.com/attachments/953511174899634186/1073845017375932476/ANTI_-_ALT.png`)
      .setFooter(`Please rejoin whenever you meet the requirements!`)
      member.send({ embeds: [embed] }).catch(()=>{})
      member.kick({reason:`Account age: ${difference}, needed to be above ${data.Days}`})
      model1.findOne({ Guild: member.guild.id }, async(err, data) => {
    if(!data) return;
        guild = member.guild;
  if(!guild) return;

 logChannel = guild.channels.cache.get(data.Channel);

  const embed = new MessageEmbed()
  .setColor(`PURPLE`)
  .setAuthor(`${member.user.tag} - Kicked by Anti-Alt`, member.displayAvatarURL())
    .addField(`Account Creation Date (IN DAYS):`, `\`${difference}\` days ago.`)
    .addField(`Account Age Requirement (IN DAYS):`, `\`${time}\` days.`)
  .setFooter(`${client.user.username} | Thank You For Using Me!`, guild.iconURL())
  
  logChannel.send({ embeds: [embed] })
      })
    }
  })
})