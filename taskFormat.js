exports.index = (todayTasks, month, day) => {
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
  todayTasks.forEach((value) => {
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
};
