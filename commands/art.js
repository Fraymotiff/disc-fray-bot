const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('art')
        .setDescription('Replies with an art image by Fraymotiff')
    ,
    async execute(interaction)
    {
        await interaction.deferReply({ ephemeral: true});
        const image = await axios.get('./images');
        const embed = new EmbedBuilder()
        .setImage(`./images/${image.request.path}`);

        await interaction.editReply({ embeds: [embed] });
    }
}