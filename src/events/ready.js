const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log('Ready! Loggerd in as ${readyClient.user.tag}');
    }
}