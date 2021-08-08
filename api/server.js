// モジュールの読み込み
const express = require('express');
const line = require('@line/bot-sdk');
const bot = require('../bot');
// configの読み込み
const config = require('../config').index();

const PORT = process.env.PORT || 3000;
const app = express();

// /にアクセスがあった時、Deploy succeededと返す
app.get('/', (req, res) => { res.send('Deploy succeeded'); });
// /webhookにアクセスがあったとき、bot.jsのindexを呼び出す
app.post('/webhook', line.middleware(config), bot.index);

app.listen(PORT);
console.log(`Server running at ${PORT}`);

//定期通知の処理が書いてあるtriggerファイル読み込み
const trigger = require('../trigger');

//app scriptのコードが実行されたら
app.post('/trigger', (req, res) => {
  trigger.triggerFunc(); //定期通知の処理
  res.end();
})
