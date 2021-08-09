message = {
  type: 'flex',
  altText: 'Flex Message',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [{
        type: 'text', text: 'moodle', weight: 'bold', color: '#1DB446', size: 'sm',
      },
      {
        type: 'text', text: '今日(8月9日)の予定', weight: 'bold', size: 'md', margin: 'md', align: 'center',
      },　//ここから動的生成したい
      { type: 'separator', margin: 'xxl' },
      {
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
            type: 'text', text: 'Unit 10 vocabulary activity closes', size: 'sm', color: '#555555', flex: 3, align: 'center', gravity: 'center',
          },
          {
            type: 'button', action: { type: 'postback', label: '完了', data: 'hogehoge' }, flex: 2, margin: 'none', gravity: 'center', style: 'primary', data: 'delete/Unit 10 vocabulary activity closes',//ここだ、ここ、ここ
          }],
        }],
      }, { type: 'separator', margin: 'xxl' }, {
        type: 'box',
        layout: 'vertical',
        margin: 'xxl',
        spacing: 'sm',
        contents: [{
          type: 'box',
          layout: 'horizontal',
          contents: [{
            type: 'text', text: 'Unit 10 vocabulary activity closes', size: 'sm', color: '#555555', flex: 3, align: 'center', gravity: 'center',
          }, {
            type: 'button', action: { type: 'postback', label: '完了', data: 'hogehoge' }, flex: 2, margin: 'none', gravity: 'center', style: 'primary', data: 'delete/Unit 10 vocabulary activity closes',//ここだ、ここ　ここ　dataがactionに入ってない
          }],
        }],
      }, { type: 'separator', margin: 'xxl' }, {
        type: 'box',
        layout: 'vertical',
        margin: 'xxl',
        spacing: 'sm',
        contents: [{
          type: 'box',
          layout: 'horizontal',
          contents: [{
            type: 'text', text: 'Unit 10 vocabulary activity closes', size: 'sm', color: '#555555', flex: 3, align: 'center', gravity: 'center',
          }, {
            type: 'button', action: { type: 'postback', label: '完了', data: 'hogehoge' }, flex: 2, margin: 'none', gravity: 'center', style: 'primary', data: 'delete/Unit 10 vocabulary activity closes',
          }],
        }],
      }, { type: 'separator', margin: 'xxl' }, {
        type: 'box',
        layout: 'vertical',
        margin: 'xxl',
        spacing: 'sm',
        contents: [{
          type: 'box',
          layout: 'horizontal',
          contents: [{
            type: 'text', text: 'Unit 10 vocabulary activity closes', size: 'sm', color: '#555555', flex: 3, align: 'center', gravity: 'center',
          }, {
            type: 'button', action: { type: 'postback', label: '完了', data: 'hogehoge' }, flex: 2, margin: 'none', gravity: 'center', style: 'primary', data: 'delete/Unit 10 vocabulary activity closes',
          }],
        }],
      }, { type: 'separator', margin: 'xxl' }, {
        type: 'box',
        layout: 'vertical',
        margin: 'xxl',
        spacing: 'sm',
        contents: [{
          type: 'box',
          layout: 'horizontal',
          contents: [{
            type: 'text', text: 'Unit 10 vocabulary activity closes', size: 'sm', color: '#555555', flex: 3, align: 'center', gravity: 'center',
          }, {
            type: 'button', action: { type: 'postback', label: '完了', data: 'hogehoge' }, flex: 2, margin: 'none', gravity: 'center', style: 'primary', data: 'delete/Unit 10 vocabulary activity closes',
          }],
        }],
      }],
    },
  },
};
