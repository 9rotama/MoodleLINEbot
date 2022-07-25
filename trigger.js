const axios = require('axios');
const taskFormat = require('taskFormat').index;
const config = require('./config').index();

const client = new line.Client(config);
const dbAPI = 'https://sheetdb.io/api/v1/1zz766ujclw94';

exports.triggerFunc = () => axios
  .get(dbAPI)
  .then((r) => r.data)
  .then(async (data) => {
    const todayDate = new Date(); // 今日の日付を取得
    const thisYear = todayDate.getFullYear();
    const thisMonth = todayDate.getMonth() + 1;
    const today = todayDate.getDate();

    for (let i = 0; i < data.length; i++) {
      const { userId } = data[i];
      const tasks = JSON.parse(data[i].tasks);
      const todayTasks = tasks.filter(
        (value) => value.YEAR === thisYear
            && value.MONTH === thisMonth
            && value.DAY === today,
      ); // 今月のタスクを取得

      await axios.put(`${dbAPI}/userId/${userId}`, {
        data: [{ todaytasks: todayTasks }],
      });
      const message = taskFormat(todayTasks, thisMonth, today);

      client.pushMessage(userId, message);
    }
  });
