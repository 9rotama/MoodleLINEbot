// 自分のやつ
const dbAPI = 'https://sheetdb.io/api/v1/3r8wfrod9urni';
const userId = 'U5306b76f1752cf8e8a189542fa91ff2c';
const axios = require('axios');

// タスクタイトルを仮置き
const taskTitle = 'Unit 10 vocabulary activity closes';

// tasksカラムからjsonを取得する関数
async function axiosTasks() {
  const taskJson = (await axios.get(`${dbAPI}/search?userId=${userId}`).catch((e) => console.log(e))).data[0];
  const Tasks = JSON.parse(taskJson.tasks);
  return Tasks;
// todaytasksカラムから配を取得する関数
}
async function axiosTodayTasks() {
  const taskJson = (await axios.get(`${dbAPI}/search?userId=${userId}`).catch((e) => console.log(e)));
  const taskData = taskJson.data[0];
  const todayTasks = JSON.parse(taskData.todaytasks);
  return todayTasks;
}
// todaytasksカラムから特定の値を削除する関数
function filterTodayTasks(todayTasks) {
  const newTodayTasks = todayTasks.filter((value) => value.TITLE !== taskTitle);
  axios.put(`${dbAPI}/userId/${userId}`, { data: [{ todaytasks: newTodayTasks }] });
  return newTodayTasks;
}

// tasksカラムから特定の値を削除する関数
function filterTasks(Tasks) {
  const newTasks = Tasks.filter((value) => value.TITLE !== taskTitle);
  axios.put(`${dbAPI}/userId/${userId}`, { data: [{ tasks: newTasks }] });
}

function createMeassage(newTodayTasks) {
  // 日時を動的に取得
  const hiduke = new Date();
  const month = hiduke.getMonth() + 1;
  const day = hiduke.getDate();
  // console.log(todayTasks[0].TITLE);

  // messageオブジェクトの宣言(テンプレ) ***
  const message = {
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

  // messageの必要な中身だけ定数にする(テンプレ) ***/*
  const flex_contents = message.contents.body.contents;

  // セパレータの宣言(format) ***
  const separator = {
    type: 'separator',
    margin: 'xxl',
  };

  // 動的に配列を生成
  newTodayTasks.forEach((value) => {
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
    };
    // セパレータの追加
    flex_contents.push(separator);
    // console.log(value.TITLE);
    // task_boxの中身の追加
    task_box.contents[0].contents[0].text = value.TITLE;
    task_box.contents[0].contents[1].action.data = `delete/${value.TITLE}`;

    // task_boxとして一括追加
    message.contents.body.contents.push(task_box);
  });
  return message;
}

// メイン関数
async function main() {
  // tasksカラムからjsonを取得する関数
  const Tasks = (await axiosTasks());
  // console.log(Tasks);
  const todaytasks = (await axiosTodayTasks());
  // console.log(todaytasks);
  const newTodayTasks = filterTodayTasks(todaytasks);
  // let deleted_todaytasks = (await axiosTodayTasks());
  // console.log(newTodayTasks);
  filterTasks(Tasks);
  const message = createMeassage(newTodayTasks);
  console.log(message);
}

// delete以下の文字列を抽出する関数
function substruct() {
  const str = 'delete/homework 8';
  const result = str.substr(7);
  return result;
}
