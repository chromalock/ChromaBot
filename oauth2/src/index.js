require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');

const port = process.env.PORT || 1500;
const app = express();

app.get('/api/auth/discord/redirect', async (req, res) => {
    const {code} = req.query;

    if (code){
        const formData = new url.URLSearchParams({
            client_id: process.env.ClientID,
            client_secret: process.env.ClientSecret,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: 'http://localhost:1500/api/auth/discord/redirect',
        });

        const output = await axios.post('https://discord.com/api/v10/oauth2/token', 
            formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            },
        );

        if (output.data) {

        }
    }
})

