const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const download = require('image-downloader');
const path = require('path');
const fs = require('fs');
const message = require('./message');

let sender = []

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
    },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
})

client.initialize( );

client.on('message', async msg => {
    if (msg.from.includes('@c.us')) {
    if (msg.body == '!bantuan') {
        client.sendMessage(msg.from, message.bantuan);
    } 
    else if (msg.body == '!pembayaran') {
        client.sendMessage(msg.from, message.pendahuluan);
    }  
    else if (msg.body == '!chat admin'){
        client.sendMessage(msg.from, message.rencanakss);
    }
    else {
        client.sendMessage(msg.from, `Halo *${msg._data.notifyName}*, saat ini anda sedang menghubungi call center perumahan*.\nSilahkan ketik *"!bantuan"* untuk melihat daftar perintah yang tersedia.`);
    }
}});

