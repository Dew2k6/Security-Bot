const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/verifysystem")

module.exports = {
    name: "setup-verify",
    description: "Setup the Verify System",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to make the verify channel",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true,
      }, 
      {
        name: "role",
        description: "Select the Verify role",
        type: "ROLE",
        required: true,
      }, 
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getChannel('channel');
      let role = interaction.options.getRole('role');
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
      
      const emb = new MessageEmbed()
      .setTitle(`Click the Button below to verify for **${interaction.guild.name}**!`)
        .setImage(`urimg`)
      .setFooter({ text: "Captcha Verification", iconURL: `${client.user.displayAvatarURL()}` })
      .setColor(client.config.color.main)

      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Verify`)
        .setStyle(`PRIMARY`)
        .setCustomId(`verify_start`)
      ])

      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data) data.delete()

        new model({
          Guild: interaction.guild.id, 
          Channel: ch.id,
          Role: role.id,
        }).save()
      })
      ch.send({ content: ` `, embeds: [emb], components: [row] });
      return msg.edit({ content: `<a:yes_animated:911729650030510081> **Setup the Verify System in ${ch}!**` })
    },
};
