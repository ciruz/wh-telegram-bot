'use strict';

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

let config = require('./config.json'); // JSON File - als Pseudo DB verwenden
let channels = JSON.parse(fs.readFileSync('./channels.json', 'utf8'));

const bot = new TelegramBot(config.botToken, {
    polling: true
});

// rudimentäre Befehl Responses, zu Demo Zwecken hardgecoded:
bot.on('message', (msg) => {

    // Telegram Default: /start
    if (msg.text.toLowerCase().indexOf('/start') === 0) {
        return bot.sendMessage(msg.chat.id, `Hallo ${msg.chat.first_name}! 👋\nBitte leg fest wo du wohnst.`, {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                'keyboard': [
                    ['Wie?']
                ]
            },
            parse_mode: 'HTML'
        });
    }

    if (msg.text.toLowerCase().indexOf('wie?') === 0) {
        return bot.sendMessage(msg.chat.id, 'Schreib einfach deine Postleitzahl und deinen Ort in den Chat. z.B:\n\n8430 Leibnitz');
    }

    if (msg.text.toLowerCase().indexOf('ja') === 0) {

        // Alle Channels in DB (JSON) abspeichern:
        fs.writeFile('./channels.json', JSON.stringify(channels), (err) => {
            if (err) console.error(err)
        });

        return bot.sendMessage(msg.chat.id, `Okay ${msg.chat.first_name}, ich habe deinen Ort gespeichert. 👍`);
    }

    if (msg.text.toLowerCase().indexOf('nein') === 0) {
        return bot.sendMessage(msg.chat.id, 'Bitte leg deinen Ort fest, schreib einfach deine Postleitzahl und deinen Ort in den Chat. z.B:\n\n8430 Leibnitz');
    }

    // Check ob "PLZ Ort"
    let location;
    let regex = /(\d{4})\s([A-Za-zÄÖÜäöüß\-. ]+)/gi;
    if ((location = regex.exec(msg.text)) !== null) { // 8430 Leibnitz | 8472 Straß in Steiermark

        let plz = location[1];
        let ort = location[2];

        // Object aufbereiten für die "Datenbank"
        let chatId = msg.chat.id;
        channels[chatId] = {
            plz: plz,
            ort: ort,
            name: msg.chat.first_name
        }

        return bot.sendMessage(msg.chat.id, `Ich habe folgenden Ort gefunden:\n\n<b>PLZ:</b> ${plz}\n<b>Ort:</b> ${ort}\n\nIst das richtig?`, {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                'keyboard': [
                    ['Ja'],
                    ['Nein']
                ]
            },
            parse_mode: 'HTML'
        });
    } else {
        // ganz simples Fallback, wenn gar nichts zutrifft:
        return bot.sendMessage(msg.chat.id, 'Ich hab deine Eingabe nicht verstanden oder deinen Ort nicht gefunden. 😞 Bitte schreib deine Postleitzahl gefolgt von deinem Ort.');
    }

});