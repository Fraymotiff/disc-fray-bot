const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('artsender')
        .setDescription('Replies with a random image'),

    async execute(interaction) {
        let files = fs.readdirSync("./images");
        let picture = files[Math.floor(Math.random() * files.length)];
        await interaction.reply({ files: [`./images/${picture}`] });
    }
};

    
