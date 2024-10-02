const { SlashCommandBuilder, EmbedBuilder, time, TimestampStyles, AttachmentBuilder } = require('discord.js');
var https = require('https');
const express = require('express');
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gbsubmit')
        .setDescription('Submit a piece of media to be shown on a gameboy')
        .addAttachmentOption(
            option =>
                option.setName('attachment')
                .setDescription('Attach an image, video or audio file')
                .setRequired(true)
        )
        .addBooleanOption(
            option =>
                option.setName('high-quality')
                .setDescription('Quality of video, yes for high quality, no for low quality. Default is low quality')
                .setRequired(false)
        ),
    async execute(interaction) {
        const callbackSubpath = "/returnData"
        const app = express ();
        var PORT = 9091;
        const userID = interaction.member.id;
        const attachment = interaction.options.getAttachment('attachment');
        var highQuality = "lq";
        if (interaction.options.getBoolean('high-quality')) { highQuality = "hq" }
        const messageID = interaction
        const date = new Date();
        const relative = time(date, TimestampStyles.RelativeTime);
        const callbackURL = `http://73.181.146.161:9091${callbackSubpath}`;

        var messageSeed = Math.random();
        Math.trunc(messageSeed);
        var urlParams = `message_id=${messageSeed}&url=${encodeURIComponent(attachment.url)}&quality=${highQuality}&callback_url=${callbackURL}`

        var options = {
            host: "https://liberal-rooster-guiding.ngrok-free.app/submit?",
            path: urlParams,
            method: 'GET'
        }
        var uri = options.host + options.path;


        app.use(express.json());
        app.listen(PORT, () => {
            console.log("Server Listening on PORT:", PORT);
        });
        
        var responseURL = '';
        app.post("/returnData", (request, response) => {
            const status = {
               "Status": "Running"
            };
            responseURL = request.body;
            


            if (attachment) {
                
                const file = new AttachmentBuilder(responseURL.result_url);
                let testEmbed = new EmbedBuilder()
                    .setDescription("Submission Manager")
                    .setColor("#bc0000")
                    .addFields(
                        {name: 'Requested by', value: `<@${userID}> with ID ${userID}`},
                        {name: 'Time', value: relative},
                        {name: 'Seed', value: `${messageSeed}`},
                        {name: 'Response URL', value: `${responseURL.result_url}`}
                    )
                    .setImage(responseURL.result_url);
        
                interaction.reply(responseURL.result_url)
                // interaction.reply({ embeds: [testEmbed], files: [file] });
            }


            response.send(status);
        });
        
        https.request(uri, function(res) {
            console.log('Status: ' + res.statusCode);
            console.log('Headers: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log('BODY: ' + chunk);
            });
        }).end();
    },
}