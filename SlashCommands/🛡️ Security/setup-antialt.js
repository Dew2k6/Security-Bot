const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const model = require("../../models/antialt");

module.exports = {
    name: "setup-antialt",
    description: "Setup the AntiAlt System",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "min_acctime",
        description: "Type the number of days old a account ae has to be to join",
        type: "INTEGER",
        required: true,
      },
      {
        name: "toggle",
        description: "Select to enable or disable this module",
        type: "STRING",
        required: true,
        choices: [
          {name:"enable" ,value:"enable"},
          {name:"disable",value:"disable"},
        ]
      },
    ], 
    run: async (client, interaction, args) => {
      let aa_amount = interaction.options.getInteger('min_acctime')
      let aa_toggle = interaction.options.getString('toggle')
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      if(aa_amount > 730) return msg.edit(`⚠ ${aa_amount} is too high, it must be under 2years (730 days)!`)
      

      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(data && aa_toggle == 'disable'){
          data.delete()
        } else if(data && aa_toggle == 'enable'){
           
          data.delete()
          new model({
            Guild: interaction.guild.id, 
            Days: aa_amount,
          }).save()
        } else {
           
          new model({
            Guild: interaction.guild.id, 
            Days: aa_amount,
          }).save()
        }
      })
      return msg.edit({ content: `<a:yes_animated:911729650030510081> **The Anti-Alt System has been ${aa_toggle}d!**` })
    },
};
