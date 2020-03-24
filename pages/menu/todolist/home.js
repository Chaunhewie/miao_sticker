// pages/menu/todolist/home.js
import Todo from '../../../models/Todo'
import storeManager from '../../../store/storeManager'

Page({
  data: {
    // todolist
    todolist: [],

    uncompletedCount: 0,
    completedCount: 0,
    todayCompletedCount: 0,

    //  展示的时间类型
    showDateType: 0, // {0: createAt, 1: lastChangeAt, 2: planToCompleteAt/completedAt}
    showDateTypeKey: "__SDT__",
    showDateTypeText: [
      ["创建时间", "创建时间"],
      ["上次修改时间", "上次修改时间"],
      ["预完成时间", "完成时间"]
    ],
    // 是否动画延迟
    delay: true
  },

  onLoad: function(){
    var showDateType = wx.getStorageSync(this.data.showDateTypeKey)
    if(!showDateType){
      showDateType = 0
    }
    this.setData({
      showDateType: showDateType,
    })
  },

  onShow: function() {
    // 为了新建后列表能更新，此逻辑必须写在 onShow 事件
    this.syncData()
  },

  onHide: function() {
    this.syncData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  syncData() {
    // 获取列表
    this.data.todolist = storeManager.getTodolistStore().getItemlist()
    this.update()
    // 动画结束后取消动画队列延迟
    setTimeout(() => {
      this.setData({
        delay: false
      })
    }, 2000)
  },

  update(data) {
    data = data || this.data
    let todolistStore = storeManager.getTodolistStore()
    data.completedCount = todolistStore.getCompletedItemlist().length
    data.uncompletedCount = todolistStore.getUncompletedItemlist().length
    data.todayCompletedCount = todolistStore.getTodayCompletedItemlist().length
    // todolistStore备份
    todolistStore.save()
    this.setData(data)
  },

  handleAddTodo(e) {
    wx.navigateTo({
      url: './create'
    })
  },

  handleTodoChange(e) {
    let index = e.currentTarget.dataset.index
    let todo = e.detail.data.todo
    let item = this.data.todolist[index]
    Object.assign(item, todo)
    this.update()
  },

  handleTodoLongPress(e) {
    // 获取 index
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这项任务吗？',
      success: (e) => {
        if (e.confirm) {
          this.data.todolist.splice(index, 1)
          this.update()
        }
      }
    })
  },

  handleTitleTap(e) {
    this.editTodo(e)
  },

  handleDateTap(e) {
    this.editTodo(e)
  },

  handleShowDateTypeChange() {
    var showDateType = this.data.showDateType + 1
    if (showDateType >= this.data.showDateTypeText.length) {
      showDateType = 0
    }
    // 存储当前页面的时间展示类型
    wx.setStorageSync(this.data.showDateTypeKey, showDateType)
    this.setData({
      showDateType: showDateType
    })
  },

  editTodo(e) {
    var uuid = e.currentTarget.dataset.uuid
    wx.navigateTo({
      url: './create?uuid=' + uuid
    })
  },

  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})