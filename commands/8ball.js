const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Replies with a random answer to your question')
    .addStringOption(option => 
        option.setName('question')
            .setDescription('ask the seer a question')
            .setMinLength(10)
            .setMaxLength(100)
            .setRequired(true)
    )
    .addBooleanOption(option => 
        option.setName('hidden')
            .setDescription('whether the answer should be hidden or not')
    ),
    async execute(interaction){

const options = interaction.options;
const question = options.getString('question');
const hidden = options.getBoolean('hidden');
        if(!question.endsWith('?')) return interaction.reply({ephemeral: true, content: 'Question must end with a "?"'}); 
        let randomNumber = Math.floor(Math.random() * 25);
    
const embed = new EmbedBuilder()
.setTitle('The Seer has spoken')
.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
.setDescription(question)
.addFields({

    name: 'Answer',
    value: respostas[randomNumber] || "I don't know."
});

interaction.reply({ ephemeral: hidden, embeds: [embed] });

}
}



const respostas = [ 
    "Yes, definitely.",
    "Ask again later.",
    "Cannot predict now.",
    "Absolutely not.",
    "It is certain.",
    "Don't count on it.",
    "The future is unclear.",
    "Yes, but not immediately.",
    "Very likely.",
    "Better not to ask.",
    "Without a doubt.",
    "Outlook not so good.",
    "Yes, in due time.",
    "My sources say no.",
    "You may rely on it.",
    "It's a mystery.",
    "I wouldn't count on it.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "The stars say yes.",
    "Try again later.",
    "Not in a million years.",
    "The chances are slim.",
    "It’s a yes, for now.",
    "The outlook is promising."
];

// Remove this misplaced code block