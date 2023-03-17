const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Finds the bots edit message speed",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Pinging..`);

      setTimeout(() => {
        msg.edit(`${Math.round(client.ws.ping)}ms | RT: ${msg.createdTimestamp - interaction.createdTimestamp}\n\n> <:wifi_color:942523245196873758> **I am on Shard: \` ${interaction.guild.shardId} \`**`);
      }, 500);
    },
};
