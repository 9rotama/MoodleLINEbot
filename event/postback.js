const axios = require('axios');
// const messageFunc = require('./message');

// チームのやつ
// const dbAPI = 'https://sheetdb.io/api/v1/1zz766ujclw94';

// 自分のやつ
const dbAPI = 'https://sheetdb.io/api/v1/3r8wfrod9urni';

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
        const todayDate = new Date(); // 今日の日付を取得
        todayDate.setHours(todayDate.getHours());
        const thisYear = todayDate.getFullYear();
        const thisMonth = todayDate.getMonth() + 1;
        const today = todayDate.getDate();

        //　スプレッドシートから今日のタスクを取得、todaystasksに保存
        axios.get(`${dbAPI}/search?userId=${userId}`)
          .then((r) => r.data)
          .then((userData) => userData[0].tasks) // スプレッドシートからタスクを取得
          .then((tasksJson) => JSON.parse(tasksJson))
          .then((tasks) => {
            // eslint-disable-next-line max-len
            const todayTasks = tasks.filter((value) => value.YEAR === thisYear && value.MONTH === thisMonth /* && value.DAY === today */); // 今月のタスクを取得
            axios.put(`${dbAPI}/userId/${userId}`, { data: [{ todaytasks: todayTasks }] }); // 今日のタスクを別のカラムに保存
          });

        // const tasksJson = await axios.get(`${dbAPI}/search?userId=${userId}`).data[].todaytasks;
        // todaytasksからjsonをとってくる
        // DBからユーザーのデータを取得
        const taskResponse = (await axios.get(`${dbAPI}/search?userId=${userId}`).catch(e => console.log(e)));
        const taskdata = taskResponse.data[0];
        console.log(taskdata);
        console.log(taskResponse.status);
        const todayTasks = JSON.parse(taskdata.todaytasks);
        // console.log(todayTasks);
        // 日時を動的に取得
        const hiduke = new Date();
        const month = hiduke.getMonth() + 1;
        const day = hiduke.getDate();
        // console.log(todayTasks[0].TITLE);

        // messageオブジェクトの宣言(テンプレ) ***
        message = {
          type: 'flex',
          altText: 'Flex Message',
          contents: {
            type: 'bubble',
            // 中身
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                // ヘッダー
                {
                  type: 'text',
                  text: 'moodle',
                  weight: 'bold',
                  color: '#1DB446',
                  size: 'sm',
                },
                {
                  type: 'text',
                  text: `今日(${month}月${day}日)の予定`,
                  weight: 'bold',
                  size: 'md',
                  margin: 'md',
                  align: 'center',
                },
                // ここから動的生成をしたい タスクの中身
              ],
            },
          },
        };

        // タスクの個数を調べる
        // console.log(todayTasks.length);

        // messageの必要な中身だけ定数にする(テンプレ) ***/*
        const flex_contents = message.contents.body.contents;

        // セパレータの宣言(format) ***
        const separator = {
          type: 'separator',
          margin: 'xxl',
        };

        // タスクボックスの宣言(format) ***
        const task_box = {
          type: 'box',
          layout: 'vertical',
          margin: 'xxl',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: 'hogehoge', // hogehoge
                  size: 'sm',
                  color: '#555555',
                  flex: 3,
                  align: 'center',
                  gravity: 'center',
                },
                {
                  type: 'button',
                  action: {
                    type: 'postback',
                    label: '完了',
                    data: 'hogehoge', // hogehoge
                  },
                  flex: 2,
                  margin: 'none',
                  gravity: 'center',
                  style: 'primary',
                },
              ],
            },
          ],
        };// ここまで

        // 動的に配列を生成
        todayTasks.forEach((value) => {
          // セパレータの追加
          flex_contents.push(separator);
          // task_boxの中身の追加
          task_box.contents[0].contents[0].text = value.TITLE;
          task_box.contents[0].contents[1].action.data = `delete/${value.TITLE}`;
          // task_boxとして一括追加
          flex_contents.push(task_box);
          message.contents.body.contents = flex_contents;
          // console.log(message.contents.body.contents);
        });
        console.log(message.contents.body.contents);
      } else {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: 'データが存在しません',

        };
      }
      console.log('break手前です');
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
  // console.log('return message 手前です');
  console.log(message);
  return message;
};
