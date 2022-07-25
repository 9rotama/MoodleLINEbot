const axios = require('axios');
// const messageFunc = require('./message');
const taskFormat = require('../taskFormat').index;

// チームのやつ
const dbAPI = 'https://sheetdb.io/api/v1/1zz766ujclw94';

// 自分のやつ
// const dbAPI = 'https://sheetdb.io/api/v1/3r8wfrod9urni';

// ポストバックイベントが飛んできた時
exports.index = async (event) => {
  // ユーザーIDを取得
  const { userId } = event.source;
  // DBからユーザーのデータを取得
  const data = (await axios.get(`${dbAPI}/search?userId=${userId}`)).data[0];

  // delete以下の文字列を抽出する関数
  function substruct(str) {
    const result = str.substr(7);
    return result;
  }

  // tasksカラムからjsonを取得する関数
  // async function axiosTasks() {
  // const taskJson = data; // 修正
  // const Tasks = JSON.parse(taskJson.tasks);
  // return Tasks;
  // }
  // todaytasksカラムから配を取得する関数
  async function axiosTodayTasks() {
    const taskJson = data; // 修正
    const todayTasks = JSON.parse(taskJson.todaytasks);
    return todayTasks;
  }
  // todaytasksカラムから特定の値を削除する関数 削除済みオブジェクトを返す。
  function filterTodayTasks(todayTasks, taskTitle) {
    const newTodayTasks = todayTasks.filter((value) => value.TITLE !== taskTitle);
    axios.put(`${dbAPI}/userId/${userId}`, { data: [{ todaytasks: newTodayTasks }] });
    return newTodayTasks;
  }

  // tasksカラムから特定の値を削除する関数
  // function filterTasks(Tasks, taskTitle) {
  // const newTasks = Tasks.filter((value) => value.TITLE !== taskTitle);
  // axios.put(`${dbAPI}/userId/${userId}`, { data: [{ tasks: newTasks }] });
  // }
  // 削除時のメッセージオブジェクトを生成する関数
  function createMeassage(newTodayTasks) {
  // 日時を動的に取得
    const hiduke = new Date();
    hiduke.setHours(hiduke.getHours() + 9);
    const month = hiduke.getMonth() + 1;
    const day = hiduke.getDate();
    // console.log(todayTasks[0].TITLE);
    return taskFormat(newTodayTasks, month, day);
  }
  // delete処理用のメイン関数 ＊＊＊＊
  async function deleteMain(tasktitle) {
  // tasksカラムからjsonを取得する関数
    // const Tasks = (await axiosTasks());
    // console.log(Tasks);
    const todaytasks = (await axiosTodayTasks());
    // console.log(todaytasks);
    const newTodayTasks = filterTodayTasks(todaytasks, tasktitle);
    // let deleted_todaytasks = (await axiosTodayTasks());
    // console.log(newTodayTasks);
    // filterTasks(Tasks, tasktitle);
    const message = createMeassage(newTodayTasks);
    return message;
  }

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
    // postbackからtasktitleを抽出する
    const taskTitle = substruct(postbackData);
    // console.log(`タスクタイトル：${taskTitle}`);
    // json取得・タスク削除・DBに戻す・メッセージ生成
    message = deleteMain(taskTitle);
    // console.log(`Message: \n${message}`);
    return message;
  }

  // タスクの表示を行う
  switch (postbackData) {
    // ユーザーのデータがDBに存在する時
    case 'タスク表示': {
      if (data) {
        /* const todayDate = new Date(); // 今日の日付を取得
        todayDate.setHours(todayDate.getHours());
        const thisYear = todayDate.getFullYear();
        const thisMonth = todayDate.getMonth() + 1;
        const today = todayDate.getDate();
        // スプレッドシートから今日のタスクを取得、todaystasksに保存  消してみる
        axios.get(`${dbAPI}/search?userId=${userId}`)
          .then((r) => r.data)
          .then((userData) => userData[0].tasks) // スプレッドシートからタスクを取得
          .then((tasksJson) => JSON.parse(tasksJson))
          .then((tasks) => {
            const todayTasks = tasks.filter(
              (value)
              => value.YEAR === thisYear && value.MONTH === thisMonth  && value.DAY === today );
              // 今月のタスクを取得
            axios.put(`${dbAPI}/userId/${userId}`, { data: [{ todaytasks: todayTasks }] });
            // 今日のタスクを別のカラムに保存
          }); */

        // const tasksJson = await axios.get(`${dbAPI}/search?userId=${userId}`).data[].todaytasks;

        // todaytasksからjsonをとってくる
        // DBからユーザーのデータを取得
        const taskResponse = (await axios.get(`${dbAPI}/search?userId=${userId}`).catch((e) => console.log(e)));
        const taskdata = taskResponse.data[0];
        // console.log(taskdata);
        // console.log(taskResponse.status);
        const todayTasks = JSON.parse(taskdata.todaytasks);

        // 日時を動的に取得
        const hiduke = new Date();
        hiduke.setHours(hiduke.getHours() + 9);
        const month = hiduke.getMonth() + 1;
        const day = hiduke.getDate();
        console.log(month, day);

        // console.log(todayTasks[0].TITLE);
        message = taskFormat(todayTasks, month, day);
      } else {
        // 返信するメッセージを作成
        message = {
          type: 'text',
          text: 'データが存在しません',

        };
      }
      // console.log('break手前です');
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
  // console.log(message);
  return message;
};
