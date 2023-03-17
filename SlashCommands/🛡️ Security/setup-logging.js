const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/logging")

module.exports = {
    name: "setup-logging",
    description: "Setup the Logging System",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to make the log channel",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true,
      },
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getChannel('channel');
      let role = interaction.options.getRole('role');
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
      
      const emb = new MessageEmbed()
      .setTitle(`Security Shield | Logging System`)
.setDescription(`This channel is now setupped as the **Logging** channel!\n\n**__Embed Color Information:__**\n🟩 -> \`Creations\`\n🟦 -> \`None as Important\`\n🟨 -> \`Audit-Updated\`\n🟥 -> \`Audit-Deleted\`\n🟪 -> \`Anti-Alt Actions\`\n⬜ -> \`Anti-Nuke Actions\``)
      .setFooter({ text: "Advanced Server-Logging", iconURL: `${client.user.displayAvatarURL()}` })
      .setColor(client.config.color.main)


      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data) data.delete()

        new model({
          Guild: interaction.guild.id, 
          Channel: ch.id,
        }).save()
      })
      ch.send({ content: ` `, embeds: [emb] });
      return msg.edit({ content: `<a:yes_animated:911729650030510081> **Setup the Security Logs in ${ch}!**` })
    },
};
