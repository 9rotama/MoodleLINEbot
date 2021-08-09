exports.triggerFunc = () => {
    axios.get(`${dbAPI}`)
        .then(r => r.data)
        .then(data => {
            for(let i=0; i<data.length; i++){
                const userId = data[i].userId;
                const tasks = JSON.parse(data[i].tasks);
                const todayTasks = tasks.filter(value => value.YEAR === thisYear && value.MONTH === thisMonth && value.DAY === today); // 今月のタスクを取得

                axios.put(`${dbAPI}/userId/${userId}`, { data: [{ todaytasks: todayTasks }] });
            }
        })
}