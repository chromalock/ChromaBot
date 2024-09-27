const { SlashCommandBuilder, EmbedBuilder, time, TimestampStyles } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gbsubmit')
        .setDescription('Submit a piece of media to be shown on a gameboy')
        .addAttachmentOption(
            option =>
                option.setName('attachment')
                .setDescription('Attach an image, video or audio file')
                .setRequired(true)
        ),
    async execute(interaction) {
        const userID = interaction.member.id;
        const attachment = interaction.options.getAttachment('attachment');
        const date = new Date();
        const relative = time(date, TimestampStyles.RelativeTime);

        let apiData = {
            "embedURL": attachment
        };

        console.log(attachment.url);

        if (attachment) {
            let testEmbed = new EmbedBuilder()
                .setDescription("Submission Manager")
                .setColor("#bc0000")
                .addFields(
                    {name: 'Requested by', value: `<@${userID}> with ID ${userID}`},
                    {name: 'Time', value: relative},
                )
                .setImage(attachment.url);
    
            await interaction.reply({ embeds: [testEmbed] });
        }
    },
}
