const { SlashCommandBuilder, EmbedBuilder, time, TimestampStyles } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong'),
    async execute(interaction) {
        // const date = new Date();
        // const timeString = time(date);
        // const relative = time(date, TimestampStyles.RelativeTime);
        
        let testEmbed = new EmbedBuilder()
            .setDescription("Pong")
            .setColor("#bc0000")
            .setDescription('pong')
            // .addFields(
            //     {name: 'test 1', value: '1'},
            //     {name: 'test 2', value: '2'},
            //     {name: 'Banned In', value: interaction.channel.name},
            //     {name: 'Time', value: relative},
            // )
            .setImage('https://cdn.discordapp.com/attachments/1257835351825973260/1286178603704516650/cat-driving.gif?ex=66ecf6ab&is=66eba52b&hm=4deb3d5e22313bbc9d220dcff940d3ef3357a3c2ec8fe66a9538cdad9ecfa521&');

        await interaction.reply({ embeds: [testEmbed] });
    },
}
