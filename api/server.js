// モジュールの読み込み
const express = require('express');
const line = require('@line/bot-sdk');
const bot = require('../bot');
// configの読み込み
const config = require('../config').index();
const trigger = require('../trigger').triggerFunc();

const PORT = process.env.PORT || 3000;
const app = express();

// /にアクセスがあった時、Deploy succeededと返す
app.get('/', (req, res) => { res.send('Deploy succeeded'); });
// /webhookにアクセスがあったとき、bot.jsのindexを呼び出す
app.post('/webhook', line.middleware(config), bot.index);
app.post('/trigger', (req, res) => {
    trigger();
    res.end();
})

app.listen(PORT);
console.log(`Server running at ${PORT}`);
