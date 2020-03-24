// pages/menu/home/home.js
Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    elements: [{
        id: 0,
        title: '任务清单',
        name: 'ToDoList',
        url: '/pages/menu/todolist/home',
        color: 'molan07',
        icon: 'list',
        animation: "",
      },
      {
        id: 1,
        title: '笔记贴',
        name: 'StickerList',
        url: '/pages/menu/stickerlist/home',
        color: 'molan12',
        icon: 'text',
        animation: "",
      },
      {
        id: 2,
        title: '我的信息',
        name: 'Me',
        url: '/pages/menu/me/me',
        color: 'molan31',
        icon: 'my',
        animation: "",
      },
    ]
  },

  methods: {
    handleClickAnimation(e) {
      var animation = e.currentTarget.dataset.class;
      var index = e.currentTarget.dataset.index;
      var that = this // 由于点击后，会进入下一个页面，this变量改变，导致延迟设定出错
      that.data.elements[index]["animation"] = animation
      that.setData({
        elements: that.data.elements
      })
      setTimeout(function() {
        that.data.elements[index]["animation"] = ""
        that.setData({
          elements: that.data.elements
        })
      }, 1000)
    },
  }

})