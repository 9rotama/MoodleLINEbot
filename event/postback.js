const axios = require('axios');
const messageFunc = require('./message');

// チームのやつ
// const dbAPI = 'https://sheetdb.io/api/v1/1zz766ujclw94';

// 自分のやつ
const dbAPI = 'https://sheetdb.io/api/v1/3r8wfrod9urni';

// userIdはLINEのやつ
// const userId = 'U5306b76f1752cf8e8a189542fa91ff2c';

// ポストバックイベントが飛んできた時
exports.index = async (event, client) => {
  // ユーザーIDを取得
  const { userId } = event.source;
  // DBからユーザーのデータを取得
  const data = (await axios.get(`${dbAPI}/search?userId=${userId}`)).data[0];

  let message;

  // ポストバックデータのmodeの値をpostbackDataに格納
  const postbackData = event.postback.data;

  // もしevent.postback.paramsが存在する場合 リッチメニュー切り替えor日時選択のとき
  if (event.postback.params) {
    // 返信するメッセージを作成
    message = {
      type: 'text',
      text: `日時データを受け取りました！\ndata: ${postbackData}\ndatetime: ${event.postback.params.datetime}`,
    };
  }

  // もしdelete文字列が含まれていたら、todoリストの完了アクション
  if (postbackData.match(/delete/)) {
    // DBから削除する機能
  }

  // タスクの表示を行う
  switch (postbackData) {
    // ユーザーのデータがDBに存在する時
    case 'タスク表示': {
      if (data) {
        // 返信するメッセージを作成.タスクの一覧を表示
        // ここだよここなんだよ
        const eventpostback = {
          replyToken: event.replyToken,
          type: 'message',
          mode: event.mode,
          timestamp: event.timestamp,
          source: {
            type: event.source.type,
            userId: event.source.userId,
          },
          message: {
            // id: event.message.id,
            type: 'text',
            text: 'Flex Message',
          },
        };

        message = await messageFunc.index(eventpostback, client);
        break;
        /*
        message = {
          type: 'text',
          text: `以下のタスクがあります\n\ntask : ${data.task}`,
        };
        */
      } else {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: 'データが存在しません',

        };
      }
      break;
    }
    // 存在しない場合
    default: {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `ポストバックデータを受け取りました！\ndata: ${postbackData}`,
      };
      break;
    }
  }

  // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
  return message;
};
