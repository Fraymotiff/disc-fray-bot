require("dotenv").config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Discord = require('discord.js')
const { Client, Intents, Collection } = require('discord.js');

const fs = require('fs');
const path = require('path');


//const client = new Client({
  //  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
//});


const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]})

const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands"); 
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.on("ready", () => {
    
    const guild_ids = client.guilds.cache.map(guild => guild.id);


    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), 
            {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute(interaction);
    }
    catch(error)
    {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command"});
    }
});

client.login(process.env.TOKEN);

     

              
   






    