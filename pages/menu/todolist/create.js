// pages/menu/todolist/create.js
import util from '../../../utils/util'
import Todo from '../../../models/Todo'
import storeManager from '../../../store/storeManager'

Page({
  data: {
    // todo
    todo: new Todo(),
    // 区分新建还是编辑
    isNew: false,
    // 级别
    levels: ['紧急且重要', '重要不紧急', '紧急不重要', '不紧急不重要'],
  },

  onLoad: function(options) {
    if (options.uuid) {
      this.setData({
        todo: storeManager.getTodolistStore().getItem(options.uuid)
      })
    } else {
      this.setData({
        todo: new Todo(),
        isNew: true
      })
    }
  },

  /**
   * Todo 改变事件
   */
  handleTodoChange(e) {
    let todo = e.detail.data.todo
    Object.assign(this.data.todo, todo)
    this.update()
  },

  /**
   * 级别改变事件
   */
  handleLevelChange(e) {
    this.data.todo.level = parseInt(e.detail.value) + 1
    this.update()
  },

  handlePlanToCompleteAtChange(e) {
    this.data.todo.planToCompleteAt = e.detail
    this.update()
  },

  /**
   * 内容输入事件
   */
  handleContentChange(e) {
    this.data.todo.content = e.detail.value
    this.update()
  },

  /**
   * 取消按钮点击事件
   */
  handleCancelTap(e) {
    wx.navigateBack()
  },

  /**
   * 保存按钮点击事件
   */
  handleSaveTap(e) {
    let todolistStore = storeManager.getTodolistStore()
    if (this.data.isNew) {
      todolistStore.addItem(this.data.todo)
    }
    todolistStore.save()
    wx.navigateBack()
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    this.data.todo.lastChangeAt = util.formatTime(new Date())
    this.setData(data)
  },

  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})