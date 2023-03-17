const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "See all of the bots commands",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let categories = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);
          if (!file.name) return "Missing file name.";
          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });
        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "WIP 🦺" : cmds.join(" "),
        };

        categories.push(data);
      }); 

      const embed = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
      .setDescription(`I am **${client.user.username},** one of the Best security bots of 2022. With Anti-Alt, Verify System, Captcha, and More!`)
      .setColor(client.config.color.main)
      .addFields(categories)
      .setFooter(`DECODERS`) 
      return interaction.followUp({ embeds: [embed] })
    },
};
