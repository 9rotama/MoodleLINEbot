// メッセージオブジェクトを動的に生成するスクリプトです。




const axios = require('axios');
const ical2json = require('ical2json');


// テンプレにフォーマットを流し込む
// とりあえず仮のtodoリストを宣言
const todayTasks = [
  {
    TITLE: 'Unit 10 vocabulary activity closes',
    YEAR: 2021,
    MONTH: 8,
    DAY: 8,
    HOUR: 18,
    MINUTE: 53,
  },
];

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
  task_box.contents[0].contents[1].data = `delete/${value.TITLE}`;
  // task_boxとして一括追加
  flex_contents.push(task_box);
  message.contents.body.contents = flex_contents;
});

// 中身が入ってるか確認
console.log(message.contents.body.contents[3].contents[0]);

// console.log(task_box.contents[0].contents);
