// pages/menu/home/home.js
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
        title: '任务清单',
        name: 'ToDoList',
        url: '/pages/menu/todolist/todolist',
        color: 'molan07',
        icon: 'list'
      },
      {
        title: '笔记贴',
        name: 'Sticker',
        url: '/pages/menu/sticker/sticker',
        color: 'molan12',
        icon: 'text'
      },
      {
        title: '我的信息',
        name: 'Me',
        url: '/pages/menu/me/me',
        color: 'molan31',
        icon: 'my'
      },
    ]
  }
})