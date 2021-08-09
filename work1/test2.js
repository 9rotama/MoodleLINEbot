const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const ical2json = require('ical2json');

// 0808 作業用１
// 自分のやつ
// lineのメッセージjsonに変形する

const dbAPI = 'https://sheetdb.io/api/v1/3r8wfrod9urni';
// const userId = 'vtjbs6nqe7duz';
const userId = 'U5306b76f1752cf8e8a189542fa91ff2c';

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
    const todayTasks = tasks.filter((value) => value.YEAR === thisYear && value.MONTH === thisMonth/* && value.DAY === today*/); // 今月のタスクを取得
    axios.put(`${dbAPI}/userId/${userId}`, { data: [{ todaytasks: todayTasks }] }); // 今月のタスクを別のカラムに保存
  });

// todaytasksからjsonをとってくる
axios.get(`${dbAPI}/search?userId=${userId}`)
  .then((r) => r.data)
  .then((userData) => userData[0].todaytasks)
  .then((tasksJson) => JSON.parse(tasksJson))
  .then((todayTasks) => {
    console.log(todayTasks); // todayTasksが今日のタスクになります
  });
